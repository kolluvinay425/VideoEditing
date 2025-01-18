import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RequirementItem = ({title, logo, icon, children}) => {
  const [expanded, setExpanded] = useState(false);

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
        <Text style={styles.title}>{title}</Text>
        {logo && (
          <Image
            style={{width: 70, height: 60, marginLeft: 10}}
            source={{uri: logo}}
          />
        )}
        {icon && (
          <Icon name={icon} style={{paddingLeft: 10}} size={50} color="#fff" />
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

const RequirementScreen = ({item}) => {
  const handleComplete = () => {
    alert('Marked as Complete!');
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.descriptionText}>{item.description.en}</Text>

      <View style={styles.container}>
        <Text style={styles.descriptionText}></Text>
      </View>

      <Text style={styles.heading}>Requirements</Text>
      <View style={styles.container}>
        {item.requirements.map((requirement, index) => (
          <RequirementItem
            key={index}
            title={requirement.heading.en}
            logo={requirement.image}
            icon={requirement.icon_image}>
            <Text style={styles.descriptionText}>
              {requirement.description.en}
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
