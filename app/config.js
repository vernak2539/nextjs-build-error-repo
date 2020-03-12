const availableLanguages = ['en', 'es', 'fr', 'it', 'nl', 'zh'];
const redeliveryResolutionTypes = ['partial_repeat_order_resolution'];
const liveOrderStatusArr = [
  'authorised',
  'new',
  'accepted',
  'confirmed',
  'confirmed_by_restaurant',
  'almost_ready',
  'ready',
  'in_transit',
  'placed',
  'ready_for_pickup',
  'pending',
];

// ES5 as server.js will consume this file.
module.exports = {
  /*
   * An array of languages that translations are available in.
   */
  languages: availableLanguages,
  /**
   * An array of resolution types which require redelivery checks to be run
   */
  redeliveryResolutionTypes,
  /**
   * Live order state
   */
  liveOrderStatusArr,
};
