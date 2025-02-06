import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RequirementItem = ({title, logo, icon, children}) => {
  const [expanded, setExpanded] = useState(false);

  const calculateWidth = () => {
    if (!icon && (!logo || logo.length === 0)) {
      return '70%'; // No icon and no logo
    }
    if (icon && (!logo || logo.length === 0)) {
      return '70%'; // Only icon exists
    }

    if (!icon && logo.length === 1) {
      return '60%'; // Only 1 logo exists (no icon)
    }

    if (icon && logo.length > 0 && logo.length <= 2) {
      return '50%'; // Both icon and logo exist (1 or 2 logos)
    }
    return '70%'; // Default case
  };

  return (
    <View style={styles.item}>
      <View style={styles.titleContainer}>
        <View style={styles.bulletContainer}>
          <View style={styles.bullet}></View>
          <View
            style={
              expanded ? styles.bulletLineExpanded : styles.bulletLine
            }></View>
        </View>

        <Text style={[styles.title, {width: calculateWidth()}]}>{title}</Text>

        {logo &&
          logo.length > 0 &&
          logo.map((logo, index) => (
            <FastImage
              key={index}
              style={styles.logo}
              source={{uri: logo, priority: FastImage.priority.normal}}
              resizeMode={FastImage.resizeMode.contain}
            />
          ))}

        {icon && (
          <Icon name={icon} style={styles.icon} size={50} color="#fff" />
        )}
      </View>

      <View style={styles.expandedContent}>
        <View style={styles.bulletSpacer}>
          <View style={styles.bulletLineExpanded}></View>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const RequirementScreen = ({item, language}) => {
  const handleComplete = () => {
    alert('Marked as Complete!');
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.descriptionText}>{item.description[language]}</Text>

      <Text style={styles.heading}>Requirements</Text>
      <View style={styles.container}>
        {item.requirements.map((requirement, index) => (
          <RequirementItem
            key={index}
            title={requirement.heading[language]}
            logo={requirement.image}
            icon={requirement.icon_image}>
            <Text style={styles.descriptionText}>
              {requirement.description[language]}
            </Text>
          </RequirementItem>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3A3A3A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: '70%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
  descriptionText: {
    color: '#f5f4f4',
  },
  item: {
    backgroundColor: 'transparent', // Dark background for the item
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#b49415',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10, // Android shadow
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  bulletLine: {
    width: 2,
    backgroundColor: '#fff',
    height: 'auto',
  },
  bulletLineExpanded: {
    width: 2,
    backgroundColor: '#fff',
    height: 20,
    flex: 1,
  },
  bulletSpacer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
  },
  logo: {
    width: 70,
    height: 60,
    marginLeft: 10,
  },
  icon: {
    paddingBottom: 8,
    marginLeft: 10,
  },
  expandedContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  content: {
    padding: 10,
    flex: 1,
  },
});

export default RequirementScreen;
