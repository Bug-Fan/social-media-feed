const ApifyClient = require('apify-client').ApifyClient;
const dotEnv = require('dotenv').config();

const getFeed = async (userId) => {

const client = new ApifyClient({
    token: String(process.env.APIFY_TOKEN),
});

const input = {
    "directUrls": [
        `https://www.instagram.com/${String(userId)}/`
    ],
    "resultsType": "details",
    "resultsLimit": 200,
    "searchType": "hashtag",
    "searchLimit": 1,
    "proxy": {
        "useApifyProxy": true,
        "apifyProxyGroups": [
            "RESIDENTIAL"
        ]
    },
    "extendOutputFunction": async ({ data, item, helpers, page, customData, label }) => {
      return item;
    },
    "extendScraperFunction": async ({ page, request, label, response, helpers, requestQueue, logins, addProfile, addPost, addLocation, addHashtag, doRequest, customData, Apify }) => {
     
    },
    "customData": {}
};

    const run = await client.actor("apify/instagram-scraper").call(input);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(items[0]);

    
    if (items[0] === null || items[0] === undefined) {
      return 'No data found for the given userId';
    } else {

      const { username, url, fullName, biography, followersCount, followsCount, highlightReelCount, private, profilePicUrl, postsCount, latestPosts } = items[0];

    return {username, url, fullName, biography, followersCount, followsCount, highlightReelCount, private, profilePicUrl, postsCount, latestPosts }
  }

}

module.exports = getFeed;