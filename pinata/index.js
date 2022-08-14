require('dotenv').config();
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');

/**
 * {pinata} - import 'api key', and 'secret api key' from '.env'.
 * {readableStreamForFile} - searching images in the folder.
 */
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET_KEY);
const readableStreamForFile = fs.createReadStream('./image/image.jpg');

const options = {
    pinataMetadata: {
        name: 'First NFT',
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

/**
 * Creating the IpfsHash of 'image'.
 * Return the URL address of the image in the 'pinata'.
 */
const pinFileToIPFS = () => {
	return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
		//handle results here
  		return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
	}).catch((err) => {
    	//handle error here
    	console.log(err);
	});
}

/**
 * Pining JSON file in ipfs. , options
 */
const pinJSONToIPFS = (body) => {
	return pinata.pinJSONToIPFS(body).then((result) => {
		//handle results here
    	return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
	}).catch((err) => {
    	//handle error here
    	console.log(err);
	});
}


/**
 * Get the {metadata}.
 * {imageURL} - issigning the received URL address to a variable.
 * Setting {name}, {description}, {image} of the NFT.
 */ 
const getMetadata = async () => {
	const imageURL = await pinFileToIPFS();
	console.log(imageURL);
	const body = {
    	name: "First NFT",
    	description: "It's my first NFT. 08/14/2022",
    	image: imageURL
	};

	const metadata = await pinJSONToIPFS(body);
	console.log(metadata);
}

getMetadata();


//https://gateway.pinata.cloud/ipfs/QmV16FUH86FLcm7zdWdfs7QXX9CAUEc8TGDvyDJxBt3BAD - image
//https://gateway.pinata.cloud/ipfs/QmNpF95JqYptBHS9rhtcpLncatiEUAei8Hv4gGMve2rTKG - metadata
