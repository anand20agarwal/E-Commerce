const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AftwXK3JoyBzV3eKbeISWHfLopqnEAdewzY_MUs4--YYLrTwH6pWQOiZcDdgAPwIO-C2XW__vHuhIddt",
  client_secret: "EA38yfYNHv0PnkD1XzSRKeir2ySJu4jRFfajWxehRy9XMJSoAwL42nxHI6n4S4Fd615AWnDNQ1X6vTvU",
});

module.exports = paypal;
