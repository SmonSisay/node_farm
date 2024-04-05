module.exports = (temp, product) => {
  let output = temp.replace(/%name%/g, product.productName);
  output = output.replace(/%image%/g, product.image);
  output = output.replace(/%vitamin%/g, product.nutrients);
  output = output.replace(/%country%/g, product.from);
  output = output.replace(/%price%/g, product.price);
  output = output.replace(/%quantity%/g, product.quantity);
  output = output.replace(/%discription%/g, product.description);
  output = output.replace(/%id%/g, product.id);
  if (!product.organic)
    output = output.replace(/%non_organic%/g, 'not-organic');

  return output;
};
