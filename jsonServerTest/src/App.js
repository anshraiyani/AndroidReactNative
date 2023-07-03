import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function App() {
  //States
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState({
    name: '',
    age: '',
    email: '',
  });
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [updateUser, setUpdateUser] = useState(undefined);
  const [searchData, setSearchData] = useState('');

  //Api calls
  const getData = async () => {
    const url = 'http://192.168.120.161:3000/users';
    let respone = await fetch(url);
    respone = await respone.json();
    setData(respone);
    // console.warn(respone);
  };

  const saveData = async () => {
    const url = 'http://192.168.120.161:3000/users';
    let result = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //handle methods
  const handleSubmit = () => {
    !postData.name ? setNameError(true) : setNameError(false);
    !postData.age ? setAgeError(true) : setAgeError(false);
    !postData.email ? setEmailError(true) : setEmailError(false);

    if (!postData.name || !postData.age || !postData.email) {
      return false;
    }
    saveData();
    getData();
    setPostData({
      name: '',
      age: '',
      email: '',
    });
  };

  const deleteUser = async id => {
    const url = 'http://192.168.120.161:3000/users';
    let result = await fetch(`${url}/${id}`, {
      method: 'delete',
    });
    result = await result.json();
    if (result) {
      getData();
    }
  };

  const handleChange = (key, value) => {
    setPostData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = data => {
    setShowDialog(true);
    setUpdateUser(data);
  };

  const handleSearch = async () => {
    const url = `http://192.168.120.161:3000/users?q=${searchData}`;
    let result = await fetch(url);
    result = await result.json();
    setData(result);
    setSearchData('');
  };

  const handleReset = () => {
    getData();
    setSearchData('');
  };

  //content render
  return (
    <View>
      {/* form section */}
      <View>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={postData.name}
          onChangeText={value => handleChange('name', value)}
        />
        {nameError ? (
          <Text style={styles.errorMsg}>Please Enter a name</Text>
        ) : null}
        <TextInput
          placeholder="age"
          style={styles.input}
          keyboardType={'numeric'}
          value={postData.age}
          onChangeText={value => handleChange('age', value)}
        />
        {ageError ? (
          <Text style={styles.errorMsg}>Please Enter Age</Text>
        ) : null}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={postData.email}
          keyboardType={'email-address'}
          onChangeText={value => handleChange('email', value)}
        />
        {emailError ? (
          <Text style={styles.errorMsg}>Please Enter an Email</Text>
        ) : null}
        <Button title="Save Data" onPress={handleSubmit} />
      </View>

      {/* Searching */}

      <View>
        <TextInput
          placeholder="Search by name"
          style={styles.input}
          value={searchData}
          onChangeText={text => setSearchData(text)}
        />
        <View style={styles.searchContainer}>
          <Button title="Search" onPress={handleSearch} />
          <Button title="Reset" onPress={handleReset} />
        </View>
      </View>

      {/* List */}
      <View style={{padding: 15}}>
        <View style={styles.listHeader}>
          <Text style={{flex: 0.8, fontSize: 20, fontWeight: '700'}}>Name</Text>
          <Text style={{flex: 1.1, fontSize: 20, fontWeight: '700'}}>Age</Text>
          <Text style={{flex: 1, fontSize: 20, fontWeight: '700'}}>
            Operations
          </Text>
        </View>
        {data.length ? (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.itemText}>{item.age}</Text>
                </View>
                <View style={{marginRight: 10}}>
                  <Button title="Delete" onPress={() => deleteUser(item.id)} />
                </View>
                <View style={{marginRight: 10}}>
                  <Button title="Update" onPress={() => handleUpdate(item)} />
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={styles.noResultText}>No Results</Text>
          </View>
        )}
      </View>
      <View>
        <Modal visible={showDialog} transparent={true} animationType="fade">
          <UpdateUserDialog
            setShowDialog={setShowDialog}
            updateUser={updateUser}
            getData={getData}
          />
        </Modal>
      </View>
    </View>
  );
}

const UpdateUserDialog = props => {
  const [updateData, setUpdateData] = useState({
    name: '',
    age: '',
    email: '',
  });

  const update = async () => {
    const url = 'http://192.168.120.161:3000/users';
    const id = props.updateUser.id;
    let result = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    result = await result.json();
    if (result) {
      props.getData();
      props.setShowDialog(false);
    }
    console.warn(updateData);
  };

  const handleUpdateChange = (key, value) => {
    setUpdateData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setUpdateData({
      name: props.updateUser.name,
      age: props.updateUser.age,
      email: props.updateUser.email,
    });
  }, [props.updateUser]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.dialogContainer}>
        <View>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={updateData.name}
            onChangeText={value => handleUpdateChange('name', value)}
          />
          <TextInput
            placeholder="age"
            style={styles.input}
            keyboardType={'numeric'}
            value={updateData.age}
            onChangeText={value => handleUpdateChange('age', value)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={updateData.email}
            keyboardType={'email-address'}
            onChangeText={value => handleUpdateChange('email', value)}
          />
          <View style={{marginBottom: 10}}>
            <Button title="Update" onPress={update} />
          </View>
        </View>
        <Button title="close" onPress={() => props.setShowDialog(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  errorMsg: {
    color: 'red',
    marginLeft: 10,
    marginBottom: 15,
  },
  listHeader: {
    flexDirection: 'row',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    width: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
  },
  noResultText: {
    fontSize: 25,
  },
});
