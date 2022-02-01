const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'eu-central-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

exports.partOfSpeech = async (req, res) => {
  const { part } = req.params;
  const { letter } = req.query;
  console.log(part);
  const params = {
    TableName: 'dictionary',
    FilterExpression: `#pos = :part and contains( #word , :letter)`,
    ExpressionAttributeNames: {
      '#pos': 'pos',
      '#word': 'word',
    },
    ExpressionAttributeValues: {
      ':part': part,
      ':letter': letter ? letter.toUpperCase() : '',
    },
  };
  try {
    const result = await dynamoDB.scan(params).promise();
    if (result.Items.length === 0) {
      return res.send('אין יא עיוני');
    }
    const num = Math.floor(Math.random() * result.Items.length);
    res.send(result.Items[num]);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.findWord = async (req, res) => {
  const { word } = req.params;
  console.log(word);
  const params = {
    TableName: 'dictionary',
    KeyConditionExpression: `word = :word`,
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
    },
  };
  try {
    const result = await dynamoDB.query(params).promise();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.findWordAndPos = async (req, res) => {
  const { word, partOfSpeech } = req.params;
  const params = {
    TableName: 'dictionary',
    KeyConditionExpression: `word = :word and pos = :pos`,
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
      ':pos': partOfSpeech,
    },
  };
  try {
    const result = await dynamoDB.query(params).promise();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
