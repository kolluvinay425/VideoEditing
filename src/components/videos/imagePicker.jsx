import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const MyImagePicker = () => {
  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300, // Desired output width
        height: 400, // Desired output height
        cropping: true, // Enable cropping
      });

      console.log('Cropped image details:', image);
      // You can display the cropped image using <Image /> component
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePicker}>
        <Text>Select and Crop Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyImagePicker;
