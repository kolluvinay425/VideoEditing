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
  console.log('logoooooo------------------>', logo.length, logo);
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
              style={{width: 70, height: 60, marginLeft: 10}}
              source={{
                uri: logo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ))}
        {icon && (
          <Icon name={icon} style={{paddingBottom: 8}} size={50} color="#fff" />
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

      <View style={styles.container}>
        <Text style={styles.descriptionText}></Text>
      </View>

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
    backgroundColor: '#554f4a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
    width: '70%',
    alignSelf: 'center',
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
    paddingBottom: 30,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
  container: {},
  descriptionText: {
    color: '#f5f4f4',
  },
  item: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fffefe',
    marginBottom: 2,
  },
  bulletLine: {
    width: 2,
    backgroundColor: '#ffffff',
    height: 'auto',
  },
  bulletLineExpanded: {
    width: 2,
    backgroundColor: '#fffefe',
    height: 15,
    flex: 1,
  },
  bulletSpacer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
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
