const {parentPort} = require("worker_threads");
const {promises: fsPromises, createReadStream, createWriteStream} = require("fs");
const path = require("path");
const zlib = require("zlib");
const {pipeline} = require("stream");

parentPort.on("message", async (data) => {
  switch (data.payload.type) {
    case "start":
      const fileToProcess = data.payload.fileToProcess;
      const key = path.join(fileToProcess.path, fileToProcess.name);
      const zipFilePath = `${key}.gz`;

      // Check if the zipped file already exists and delete it
      try {
        await fsPromises.access(zipFilePath);
        await fsPromises.unlink(zipFilePath);
        console.log(`Existing zipped file ${zipFilePath} deleted.`);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('Error checking or deleting existing zipped file:', err);
          fileToProcess.status = 'Failed';
          parentPort.postMessage({type: 'aggiornamenti', newFile: fileToProcess});
          return;
        }
      }

      const fileSize = await getFileSize(key);
      fileToProcess.size = fileSize;
      fileToProcess.status = 'In Progress';
      parentPort.postMessage({type: 'aggiornamenti', newFile: fileToProcess});

      // Compress the file and log progress
      const input = createReadStream(key);
      const output = createWriteStream(zipFilePath);
      const gzip = zlib.createGzip({ level: 9 });

      let processedBytes = 0;
      input.on('data', (chunk) => {
        processedBytes += chunk.length;
        const progress = ((processedBytes / fileSize) * 100).toFixed(2);
        console.log(`Compression progress: ${progress}%`);
        parentPort.postMessage({type: 'aggiornamenti', newFile: {...fileToProcess, progress}});

        // Introduce a delay
        input.pause();
        setTimeout(() => {
          input.resume();
        }, 10000); // Delay of 100ms
      });

      pipeline(input, gzip, output, (err) => {
        if (err) {
          console.error('Compression failed:', err);
          fileToProcess.status = 'Failed';
        } else {
          console.log('Compression completed');
          fileToProcess.status = 'Completed';
        }
        parentPort.postMessage({type: 'aggiornamenti', newFile: fileToProcess});
      });

      break;
  }
});

const getFileSize = async (filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stats = await fsPromises.stat(filePath);
      return resolve(stats.size);
    } catch (err) {
      return reject(err);
    }
  });
};
