const fs = require('fs'),
    es = require('event-stream'),
    path = require('path'),
    _ = require('lodash');


/**
 * 
 */
const readFile = async (filePath) => {

    const linesContent = [];
    const networkRelationship = [];

    return new Promise((resolve, reject) => {
        const s = fs
            .createReadStream(filePath)
            .pipe(es.split())
            .pipe(
                es.mapSync((line) => {

                    linesContent.push(line);

                    // get origin element
                    const firstPartLineSplitContent = line.split('->');

                    // get target element and latency size
                    const secondPartLineSplitContent = firstPartLineSplitContent[1].split(' ');

                    networkRelationship.push({
                        origin: firstPartLineSplitContent[0],
                        target: secondPartLineSplitContent[0],
                        latency: Number(secondPartLineSplitContent[1])
                    });

                })
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {

                    console.log('Read entire file.');

                    resolve(networkRelationship);
                })
            )
    });
}

/**
 * 
 */
const makeNetworkRepresentaiton = async () => {

    // get network relationship from file
    const networkRelationship = await readFile(path.resolve('./resources/network.txt'));

    // sort by latency
    networkRelationship.sort((a, b) => (a.latency > b.latency) ? 1 : ((b.latency > a.latency) ? -1 : 0));


    // get grouped by origin

    const groupedByOrigindevice = _(networkRelationship).groupBy(x => x.origin).value();
    const groupedByTargetdevice = _(networkRelationship).groupBy(x => x.target).value();

}


// makeNetworkRepresentaiton();

module.exports = {
    makeNetworkRepresentaiton
};