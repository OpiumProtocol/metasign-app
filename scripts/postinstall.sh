#!/bin/bash
echo "PostInstall script:"

echo "1. React Native nodeify..."
node_modules/.bin/rn-nodeify --install "react-native-randombytes,assert,crypto,url,stream,http,https,os,vm,buffer" --hack

# The build output from aes-js breaks the metro bundler. Until we safely upgrade
# to a new version of aes-js, we patch it by removing the erroneous line.
echo "2. Fix aes-js build ouput..."
AES_OUTPUT_FILE="node_modules/aes-js/index.js";
sed -i'' -e 's/var previous_mymodule = root.mymodule;//g' $AES_OUTPUT_FILE;
