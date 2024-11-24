






// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, Animated, TouchableOpacity, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon library
// import CountryPicker from 'react-native-country-picker-modal'; // Importing Country Picker

// const CurrencyConverterApp = () => {
//   const [amount, setAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');
//   const [convertedCurrency, setConvertedCurrency] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);
//   const [modalVisible, setModalVisible] = useState(true);
//   const [fadeAnim] = useState(new Animated.Value(0)); // Fade-in effect
//   const [scaleAnim] = useState(new Animated.Value(0)); // Scale effect
//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);
//   const [fromFlag, setFromFlag] = useState('US');
//   const [toFlag, setToFlag] = useState('EU');

//   useEffect(() => {
//     if (modalVisible) {
//       Animated.timing(fadeAnim, {
//         toValue: 1, // Fade in
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(fadeAnim, {
//         toValue: 0, // Fade out
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     }

//     if (convertedCurrency > 0) {
//       Animated.spring(scaleAnim, {
//         toValue: 1, // Scale up to normal size
//         friction: 4,
//         tension: 100,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [modalVisible, convertedCurrency]);

//   const fetchExchangeRate = async () => {
//     try {
//       const response = await fetch(
//         `https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/${fromCurrency}`
//       );
//       const data = await response.json();
//       if (data.result === "success") {
//         const rate = data.conversion_rates[toCurrency];
//         if (rate) {
//           setExchangeRate(rate);
//           return rate;
//         } else {
//           Alert.alert("Error", `Conversion rate for ${toCurrency} not found.`);
//           return null;
//         }
//       } else {
//         Alert.alert("Error", "Failed to fetch exchange rates.");
//         return null;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert("Error", "Unable to fetch exchange rates. Please try again later.");
//       return null;
//     }
//   };

//   const handleConvert = async () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert("Invalid Input", "Please enter a valid positive number for the amount.");
//       return;
//     }

//     const rate = await fetchExchangeRate();
//     if (rate) {
//       const converted = numericAmount * rate;
//       setConvertedCurrency(parseFloat(converted.toFixed(2)));
//     }
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://koala.sh/api/image/v2-6b5sb-4z3kl.jpg?width=1216&height=832&dream' }}
//       style={styles.container}
//       imageStyle={styles.backgroundImage}
//     >
//       {/* Quote Modal */}
//       {modalVisible && (
//         <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
//           <Text style={styles.quoteText}>
//             "Currency is merely the vessel for value; its true worth lies in how it's earned and spent."
//           </Text>
//           <TouchableOpacity style={styles.buttonOK} onPress={() => setModalVisible(false)}>
//             <Text style={styles.buttonText}>OK</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}

//       {/* Highlighted "Amount" label */}
//       <Text style={styles.highlightedLabel}>Amount:</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//           style={styles.input}
//           placeholder="Enter amount"
//         />
//       </View>

//       {/* Currency Selection Box with Flags */}
//       <Text style={styles.highlightedLabel}>Currency:</Text>
//       <View style={styles.currencyBox}>
//         <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.currencyInput}>
//           <CountryPicker
//             withFlag
//             withCountryNameButton
//             countryCode={fromFlag as "US" | "IN" | "GB" | "FR" | "DE" | "JP" | "KR" | "AU"} // Type assertion here
//             onSelect={(country) => {
//               // Check if country.currency exists and has at least one element
//               if (country.currency && country.currency.length > 0) {
//                 setFromCurrency(country.currency[0]); // Set currency code (first currency if multiple)
//                 setFromFlag(country.cca2); // Set country code (two-letter)
//               } else {
//                 // Handle cases where currency is not found or unavailable
//                 Alert.alert("Error", `Currency data for ${country.name} is unavailable.`);
//               }
//               setShowFromPicker(false);
//             }}
//             visible={showFromPicker}
//           />
//           <Text>{fromCurrency}</Text>
//         </TouchableOpacity>

//         {/* Exchange Icon - Golden color */}
//         <Icon name="exchange" size={30} color="#FFD700" style={styles.exchangeIcon} />

//         <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.currencyInput}>
//           <CountryPicker
//             withFlag
//             withCountryNameButton
//             countryCode={toFlag as "US" | "IN" | "GB" | "FR" | "DE" | "JP" | "KR" | "AU"} // Type assertion here
//             onSelect={(country) => {
//               // Check if country.currency exists and has at least one element
//               if (country.currency && country.currency.length > 0) {
//                 setToCurrency(country.currency[0]); // Set currency code (first currency if multiple)
//                 setToFlag(country.cca2); // Set country code (two-letter)
//               } else {
//                 // Handle cases where currency is not found or unavailable
//                 Alert.alert("Error", `Currency data for ${country.name} is unavailable.`);
//               }
//               setShowToPicker(false);
//             }}
//             visible={showToPicker}
//           />
//           <Text>{toCurrency}</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
//         <Text style={styles.convertButtonText}>Convert</Text>
//       </TouchableOpacity>

//       {/* Converted Amount Box */}
//       <Animated.View style={[styles.convertedAmountBox, { transform: [{ scale: scaleAnim }] }]}>
//         <Text style={styles.convertedAmountText}>
//           Amount: {convertedCurrency} {toCurrency}
//         </Text>
//       </Animated.View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'rgba(227, 242, 253, 0.8)', // Adding transparency for the background image overlay
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     resizeMode: 'cover', // Cover the screen with the background image
//     borderRadius: 20, // Optionally, round the corners of the background image
//   },
//   highlightedLabel: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#F44336', // Red color for highlighting
//     textDecorationLine: 'underline', // Underline to highlight further
//     marginVertical: 12,
//   },
//   inputContainer: {
//     width: '90%',
//     marginVertical: 12,
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: '#1E3C72',
//     borderRadius: 20,
//     padding: 12,
//     width: '100%',
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   currencyBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 12,
//     justifyContent: 'center',
//   },
//   currencyInput: {
//     borderWidth: 2,
//     borderColor: '#1E3C72',
//     borderRadius: 20,
//     padding: 12,
//     width: '40%',
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//     marginHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   exchangeIcon: {
//     marginHorizontal: 20,
//   },
//   convertButton: {
//     backgroundColor: '#FF4081',
//     padding: 12,
//     borderRadius: 10,
//     marginVertical: 12,
//     width: '80%',
//     alignItems: 'center',
//   },
//   convertButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   convertedAmountBox: {
//     padding: 12,
//     borderRadius: 10,
//     backgroundColor: '#4CAF50',
//     marginTop: 20,
//     width: '80%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   convertedAmountText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   modalContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: '30%',
//     left: '5%',
//     right: '5%',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 16,
//     borderRadius: 10,
//   },
//   quoteText: {
//     fontSize: 18,
//     fontStyle: 'italic',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   buttonOK: {
//     backgroundColor: '#F44336',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
// });

// export default CurrencyConverterApp;





import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon library

const CurrencyConverterApp = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade-in effect
  const [scaleAnim] = useState(new Animated.Value(0)); // Scale effect

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    if (convertedCurrency > 0) {
      Animated.spring(scaleAnim, {
        toValue: 1, // Scale up to normal size
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, convertedCurrency]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/${fromCurrency}`
      );
      const data = await response.json();
      if (data.result === "success") {
        const rate = data.conversion_rates[toCurrency];
        if (rate) {
          setExchangeRate(rate);
          return rate;
        } else {
          Alert.alert("Error", `Conversion rate for ${toCurrency} not found.`);
          return null;
        }
      } else {
        Alert.alert("Error", "Failed to fetch exchange rates.");
        return null;
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert("Error", "Unable to fetch exchange rates. Please try again later.");
      return null;
    }
  };

  const handleConvert = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for the amount.");
      return;
    }

    const rate = await fetchExchangeRate();
    if (rate) {
      const converted = numericAmount * rate;
      setConvertedCurrency(parseFloat(converted.toFixed(2)));
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://koala.sh/api/image/v2-6b5sb-4z3kl.jpg?width=1216&height=832&dream' }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      {/* Quote Modal */}
      {modalVisible && (
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <Text style={styles.quoteText}>
            "It’s good to have money and the things that money can buy, but it’s good, too, to check up once in a while and make sure you haven’t lost the things that money can’t buy."  n
          </Text>
          <TouchableOpacity style={styles.buttonOK} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Highlighted "Amount" label */}
      <Text style={styles.highlightedLabel}>Amount:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter amount"
        />
      </View>

      {/* Highlighted "Currency" label */}
      <Text style={styles.highlightedLabel}>Currency:</Text>
      <View style={styles.currencyBox}>
        <TextInput
          value={fromCurrency}
          onChangeText={setFromCurrency}
          style={styles.currencyInput}
          placeholder="From"
        />

        {/* Exchange Icon - Golden color */}
        <Icon name="exchange" size={30} color="#FFD700" style={styles.exchangeIcon} />

        <TextInput
          value={toCurrency}
          onChangeText={setToCurrency}
          style={styles.currencyInput}
          placeholder="To"
        />
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>

      {/* Converted Amount Box */}
      <Animated.View style={[styles.convertedAmountBox, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.convertedAmountText}>
          Amount: {convertedCurrency} {toCurrency}
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(227, 242, 253, 0.8)', // Adding transparency for the background image overlay
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover', // Cover the screen with the background image
    borderRadius: 20, // Optionally, round the corners of the background image
  },
  highlightedLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F44336', // Red color for highlighting
    textDecorationLine: 'underline', // Underline to highlight further
    marginVertical: 12,
  },
  inputContainer: {
    width: '90%',
    marginVertical: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: '#1E3C72',
    borderRadius: 20,
    padding: 12,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  currencyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    justifyContent: 'center',
  },
  currencyInput: {
    borderWidth: 2,
    borderColor: '#1E3C72',
    borderRadius: 20,
    padding: 12,
    width: '40%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
  },
  exchangeIcon: {
    marginHorizontal: 10,
  },
  convertButton: {
    backgroundColor: '#F44336', // Red color
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  convertedAmountBox: {
    padding: 20,
    backgroundColor: '#F8BBD0', // Light pink color
    borderRadius: 20,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  convertedAmountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3C72',
  },
  modalContainer: {
    backgroundColor: '#388E3C',
    padding: 20,
    borderRadius: 15,
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    alignItems: 'center',
    zIndex: 1,
  },
  quoteText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonOK: {
    backgroundColor: '#FFEB3B',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3C72',
  },
});

export default CurrencyConverterApp;








// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, Animated, TouchableOpacity, ImageBackground } from 'react-native';

// const CurrencyConverterApp = () => {
//   const [amount, setAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');
//   const [convertedCurrency, setConvertedCurrency] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);
//   const [modalVisible, setModalVisible] = useState(true);
//   const fadeAnim = new Animated.Value(0); // Start with opacity 0


//   useEffect(() => {
//     if (modalVisible) {
//       Animated.timing(fadeAnim, {
//         toValue: 1, // Fade in
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(fadeAnim, {
//         toValue: 0, // Fade out
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [modalVisible]);

//   const fetchExchangeRate = async () => {
//     try {
//       const response = await fetch(
//         `https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/${fromCurrency}`
//       );
//       const data = await response.json();
//       if (data.result === "success") {
//         const rate = data.conversion_rates[toCurrency];
//         if (rate) {
//           setExchangeRate(rate);
//           return rate;
//         } else {
//           Alert.alert("Error", `Conversion rate for ${toCurrency} not found.`);
//           return null;
//         }
//       } else {
//         Alert.alert("Error", "Failed to fetch exchange rates.");
//         return null;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert("Error", "Unable to fetch exchange rates. Please try again later.");
//       return null;
//     }
//   };

//   const handleConvert = async () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert("Invalid Input", "Please enter a valid positive number for the amount.");
//       return;
//     }

//     const rate = await fetchExchangeRate();
//     if (rate) {
//       const converted = numericAmount * rate;
//       setConvertedCurrency(parseFloat(converted.toFixed(2)));
//     }
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://koala.sh/api/image/v2-6b5sb-4z3kl.jpg?width=1216&height=832&dream' }}
//       style={styles.container}
//       imageStyle={styles.backgroundImage}
//     >
//       {/* Quote Modal */}
//       {modalVisible && (
//         <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
//           <Text style={styles.quoteText}>
//             "Currency is merely the vessel for value; its true worth lies in how it's earned and spent."
//           </Text>
//           <TouchableOpacity style={styles.buttonOK} onPress={() => setModalVisible(false)}>
//             <Text style={styles.buttonText}>OK</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}

//       <Text style={styles.label}>Amount:</Text>
//       <TextInput
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholder="Enter amount"
//       />
//       <Text style={styles.label}>From Currency:</Text>
//       <TextInput
//         value={fromCurrency}
//         onChangeText={setFromCurrency}
//         style={styles.input}
//         placeholder="Enter from currency (e.g., USD)"
//       />
//       <Text style={styles.label}>To Currency:</Text>
//       <TextInput
//         value={toCurrency}
//         onChangeText={setToCurrency}
//         style={styles.input}
//         placeholder="Enter to currency (e.g., EUR)"
//       />
//       <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
//         <Text style={styles.convertButtonText}>Convert</Text>
//       </TouchableOpacity>
//       <Text style={styles.result}>
//         Converted Amount: {convertedCurrency} {toCurrency}
//       </Text>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'rgba(227, 242, 253, 0.8)', // Adding transparency for the background image overlay
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     resizeMode: 'cover', // Cover the screen with the background image
//     borderRadius: 20, // Optionally, round the corners of the background image
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 12,
//     color: '#1E3C72',
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: '#1E3C72',
//     borderRadius: 20,
//     padding: 12,
//     width: '90%',
//     marginVertical: 12,
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   result: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 24,
//     color: '#2196F3',
//   },
//   modalContainer: {
//     backgroundColor: '#388E3C',
//     padding: 20,
//     borderRadius: 15,
//     position: 'absolute',
//     top: '25%',
//     left: '10%',
//     right: '10%',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   quoteText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   buttonOK: {
//     backgroundColor: '#d32f2f',
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   convertButton: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 50,
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   convertButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default CurrencyConverterApp;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, Alert, Animated, TouchableOpacity, ImageBackground, Image } from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';

// const CurrencyConverterApp = () => {
//   const [amount, setAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');
//   const [convertedCurrency, setConvertedCurrency] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);
//   const [modalVisible, setModalVisible] = useState(true);
//   const fadeAnim = new Animated.Value(0); // Start with opacity 0

//   // Mapping currency codes to country codes for flags
//   const currencyToCountryCode = {
//     USD: "us",
//     EUR: "eu",
//     INR: "in",
//     JPY: "jp",
//     GBP: "gb",
//     AUD: "au",
//     CAD: "ca",
//     CNY: "cn",
//     RUB: "ru",
//   };

//   // Fallback emojis for currencies
//   const currencyFlags = {
//     USD: "🇺🇸",
//     EUR: "🇪🇺",
//     INR: "🇮🇳",
//     JPY: "🇯🇵",
//     GBP: "🇬🇧",
//     AUD: "🇦🇺",
//     CAD: "🇨🇦",
//     CNY: "🇨🇳",
//     RUB: "🇷🇺",
//   };

//   const currencies = Object.keys(currencyToCountryCode);

//   // Helper to get flag image URL
//   const getFlagUrl = (currency) =>
//     https://flagcdn.com/w40/${currencyToCountryCode[currency]?.toLowerCase()}.png;

//     // Fade in/out modal animation
//     useEffect(() => {
//       if (modalVisible) {
//         Animated.timing(fadeAnim, {
//           toValue: 1, // Fade in
//           duration: 500,
//           useNativeDriver: true,
//         }).start();
//       } else {
//         Animated.timing(fadeAnim, {
//           toValue: 0, // Fade out
//           duration: 500,
//           useNativeDriver: true,
//         }).start();
//       }
//     }, [modalVisible]);

//   // Fetch exchange rates from an API
//   const fetchExchangeRate = async () => {
//     try {
//       const response = await fetch(
//         https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/${fromCurrency}
//       );
//       const data = await response.json();
//       if (data.result === "success") {
//         const rate = data.conversion_rates[toCurrency];
//         if (rate) {
//           setExchangeRate(rate);
//           return rate;
//         } else {
//           Alert.alert("Error", `Conversion rate for ${ toCurrency } not found.`);
//           return null;
//         }
//       } else {
//         Alert.alert("Error", "Failed to fetch exchange rates.");
//         return null;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert("Error", "Unable to fetch exchange rates. Please try again later.");
//       return null;
//     }
//   };

//   // Handle currency conversion
//   const handleConvert = async () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert("Invalid Input", "Please enter a valid positive number for the amount.");
//       return;
//     }

//     const rate = await fetchExchangeRate();
//     if (rate) {
//       const converted = numericAmount * rate;
//       setConvertedCurrency(parseFloat(converted.toFixed(2)));
//     }
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://koala.sh/api/image/v2-6b5sb-4z3kl.jpg?width=1216&height=832&dream' }}
//       style={styles.container}
//       imageStyle={styles.backgroundImage}
//     >
//       {/* Quote Modal */}
//       {modalVisible && (
//         <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
//           <Text style={styles.quoteText}>
//             "Currency is merely the vessel for value; its true worth lies in how it's earned and spent."
//           </Text>
//           <TouchableOpacity style={styles.buttonOK} onPress={() => setModalVisible(false)}>
//             <Text style={styles.buttonText}>OK</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}

//       <Text style={styles.label}>Amount:</Text>
//       <TextInput
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholder="Enter amount"
//       />

//       <Text style={styles.label}>From Currency:</Text>
//       <SelectDropdown
//         data={currencies}
//         onSelect={(selectedItem) => setFromCurrency(selectedItem)}
//         defaultButtonText={${currencyFlags[fromCurrency]} ${fromCurrency}}
//       buttonStyle={styles.dropdownButton}
//       renderCustomizedRowChild={(item) => (
//         <View style={styles.dropdownRow}>
//           <Image
//             source={{ uri: getFlagUrl(item) }}
//             style={styles.flagImage}
//           />
//           <Text style={styles.currencyText}>{item}</Text>
//         </View>
//       )}
//       />

//       <Text style={styles.label}>To Currency:</Text>
//       <SelectDropdown
//         data={currencies}
//         onSelect={(selectedItem) => setToCurrency(selectedItem)}
//         defaultButtonText={${currencyFlags[toCurrency]} ${toCurrency}}
//       buttonStyle={styles.dropdownButton}
//       renderCustomizedRowChild={(item) => (
//         <View style={styles.dropdownRow}>
//           <Image
//             source={{ uri: getFlagUrl(item) }}
//             style={styles.flagImage}
//           />
//           <Text style={styles.currencyText}>{item}</Text>
//         </View>
//       )}
//       />

//       <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
//         <Text style={styles.convertButtonText}>Convert</Text>
//       </TouchableOpacity>

//       <Text style={styles.result}>
//         Converted Amount: {convertedCurrency} {toCurrency}
//       </Text>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'rgba(227, 242, 253, 0.8)', // Adding transparency for the background image overlay
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     resizeMode: 'cover', // Cover the screen with the background image
//     borderRadius: 20, // Optionally, round the corners of the background image
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 12,
//     color: '#1E3C72',
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: '#1E3C72',
//     borderRadius: 20,
//     padding: 12,
//     width: '90%',
//     marginVertical: 12,
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   result: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 24,
//     color: '#2196F3',
//   },
//   modalContainer: {
//     backgroundColor: '#388E3C',
//     padding: 20,
//     borderRadius: 15,
//     position: 'absolute',
//     top: '25%',
//     left: '10%',
//     right: '10%',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   quoteText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   buttonOK: {
//     backgroundColor: '#d32f2f',
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dropdownButton: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderColor: '#1E3C72',
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     marginVertical: 10,
//   },
//   dropdownRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   flagImage: {
//     width: 30,
//     height: 20,
//     marginRight: 10,
//   },
//   currencyText: {
//     fontSize: 16,
//     color: '#1E3C72',
//   },
//   convertButton: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 50,
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   convertButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default CurrencyConverterApp;









// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   Pressable,
// } from 'react-native';

// const CurrencyConverterApp = () => {
//   const [amount, setAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');
//   const [convertedCurrency, setConvertedCurrency] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);
//   const [currencyList] = useState(['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY']);
//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(true);

//   const fetchExchangeRate = async () => {
//     try {
//       const response = await fetch(
//         `https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/${fromCurrency}`
//       );
//       const data = await response.json();

//       if (data.result === 'success') {
//         const rate = data.conversion_rates[toCurrency];
//         if (rate) {
//           setExchangeRate(rate);
//           return rate;
//         } else {
//           Alert.alert('Error', `Conversion rate for ${toCurrency} not found.`);
//           return null;
//         }
//       } else {
//         Alert.alert('Error', 'Failed to fetch exchange rates.');
//         return null;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert('Error', 'Unable to fetch exchange rates. Please try again later.');
//       return null;
//     }
//   };

//   const handleConvert = async () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert('Invalid Input', 'Please enter a valid positive number for the amount.');
//       return;
//     }

//     const rate = await fetchExchangeRate();
//     if (rate) {
//       const converted = numericAmount * rate;
//       setConvertedCurrency(parseFloat(converted.toFixed(2)));
//     }
//   };

//   const renderDropdown = (list: string[], onSelect: (item: string) => void) => (
//     <FlatList
//       data={list}
//       keyExtractor={(item) => item}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           style={styles.dropdownItem}
//           onPress={() => {
//             onSelect(item);
//             setShowFromDropdown(false);
//             setShowToDropdown(false);
//           }}
//         >
//           <Text style={styles.dropdownText}>{item}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       {/* Modal for the quote */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.quote}>
//               "Currency is merely the vessel for value; its true worth lies in how it's earned and spent."
//             </Text>
//             <Pressable
//               style={styles.okButton}
//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={styles.okButtonText}>OK</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       <Text style={styles.title}>Currency Converter</Text>

//       <TextInput
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholder="Enter amount"
//         placeholderTextColor="#888"
//       />

//       <TouchableOpacity
//         style={styles.dropdown}
//         onPress={() => setShowFromDropdown(!showFromDropdown)}
//       >
//         <Text style={styles.dropdownText}>{fromCurrency}</Text>
//       </TouchableOpacity>
//       {showFromDropdown && renderDropdown(currencyList, setFromCurrency)}

//       <TouchableOpacity
//         style={styles.dropdown}
//         onPress={() => setShowToDropdown(!showToDropdown)}
//       >
//         <Text style={styles.dropdownText}>{toCurrency}</Text>
//       </TouchableOpacity>
//       {showToDropdown && renderDropdown(currencyList, setToCurrency)}

//       <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
//         <Text style={styles.buttonText}>Convert</Text>
//       </TouchableOpacity>

//       <Text style={styles.result}>
//         Converted Amount: {convertedCurrency} {toCurrency}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#e8f5fe',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     width: '90%',
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     color: '#333',
//   },
//   dropdown: {
//     width: '90%',
//     padding: 12,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   dropdownItem: {
//     padding: 12,
//     backgroundColor: '#f9f9f9',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   convertButton: {
//     marginTop: 20,
//     backgroundColor: '#007BFF',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   result: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '80%',
//   },
//   quote: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   okButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   okButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CurrencyConverterApp;









// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';

// const CurrencyConverterApp = () => {
//   const [amount, setAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');
//   const [convertedCurrency, setConvertedCurrency] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);
//   const [currencyList] = useState(['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY']);
//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);

//   const fetchExchangeRate = async () => {
//     try {
//       const response = await fetch(
//         `https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/${fromCurrency}`
//       );
//       const data = await response.json();

//       if (data.result === 'success') {
//         const rate = data.conversion_rates[toCurrency];
//         if (rate) {
//           setExchangeRate(rate);
//           return rate;
//         } else {
//           Alert.alert('Error', `Conversion rate for ${toCurrency} not found.`);
//           return null;
//         }
//       } else {
//         Alert.alert('Error', 'Failed to fetch exchange rates.');
//         return null;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert('Error', 'Unable to fetch exchange rates. Please try again later.');
//       return null;
//     }
//   };

//   const handleConvert = async () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert('Invalid Input', 'Please enter a valid positive number for the amount.');
//       return;
//     }

//     const rate = await fetchExchangeRate();
//     if (rate) {
//       const converted = numericAmount * rate;
//       setConvertedCurrency(parseFloat(converted.toFixed(2)));
//     }
//   };

//   const renderDropdown = (list: string[], onSelect: (item: string) => void) => (
//     <FlatList
//       data={list}
//       keyExtractor={(item) => item}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           style={styles.dropdownItem}
//           onPress={() => {
//             onSelect(item);
//             setShowFromDropdown(false);
//             setShowToDropdown(false);
//           }}
//         >
//           <Text style={styles.dropdownText}>{item}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Currency Converter</Text>

//       <TextInput
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholder="Enter amount"
//         placeholderTextColor="#888"
//       />

//       <TouchableOpacity
//         style={styles.dropdown}
//         onPress={() => setShowFromDropdown(!showFromDropdown)}
//       >
//         <Text style={styles.dropdownText}>{fromCurrency}</Text>
//       </TouchableOpacity>
//       {showFromDropdown && renderDropdown(currencyList, setFromCurrency)}

//       <TouchableOpacity
//         style={styles.dropdown}
//         onPress={() => setShowToDropdown(!showToDropdown)}
//       >
//         <Text style={styles.dropdownText}>{toCurrency}</Text>
//       </TouchableOpacity>
//       {showToDropdown && renderDropdown(currencyList, setToCurrency)}

//       <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
//         <Text style={styles.buttonText}>Convert</Text>
//       </TouchableOpacity>

//       <Text style={styles.result}>
//         Converted Amount: {convertedCurrency} {toCurrency}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#e8f5fe',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     width: '90%',
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     color: '#333',
//   },
//   dropdown: {
//     width: '90%',
//     padding: 12,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   dropdownItem: {
//     padding: 12,
//     backgroundColor: '#f9f9f9',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   convertButton: {
//     marginTop: 20,
//     backgroundColor: '#007BFF',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   result: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     color: '#333',
//   },
// });

// export default CurrencyConverterApp;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// const CurrencyConverterApp = () => {
//   const [amount, setAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');
//   const [convertedCurrency, setConvertedCurrency] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);

//   const fetchExchangeRate = async () => {
//     try {
//       const response = await fetch(

//         'https://v6.exchangerate-api.com/v6/dadd5e232349f005984a4708/latest/' + fromCurrency
//       );
//       const data = await response.json();

//       if (data.result === "success") {
//         const rate = data.conversion_rates[toCurrency];
//         if (rate) {
//           setExchangeRate(rate);
//           return rate;
//         } else {
//           Alert.alert("Error", `Conversion rate for ${toCurrency} not found.`);
//           return null;
//         }
//       } else {
//         Alert.alert("Error", "Failed to fetch exchange rates.");
//         return null;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert("Error", "Unable to fetch exchange rates. Please try again later.");
//       return null;
//     }
//   };

//   const handleConvert = async () => {
//     const numericAmount = parseFloat(amount); 
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       Alert.alert("Invalid Input", "Please enter a valid positive number for the amount.");
//       return;
//     }

//     const rate = await fetchExchangeRate();
//     if (rate) {
//       const converted = numericAmount * rate;
//       setConvertedCurrency(parseFloat(converted.toFixed(2)));
//       // setConvertedCurrency(converted.toFixed(2)); // Round to 2 decimal places
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Amount:</Text>
//       <TextInput
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholder="Enter amount"
//       />
//       <Text style={styles.label}>From Currency:</Text>
//       <TextInput
//         value={fromCurrency}
//         onChangeText={setFromCurrency}
//         style={styles.input}
//         placeholder="Enter from currency (e.g., USD)"
//       />
//       <Text style={styles.label}>To Currency:</Text>
//       <TextInput
//         value={toCurrency}
//         onChangeText={setToCurrency}
//         style={styles.input}
//         placeholder="Enter to currency (e.g., EUR)"
//       />
//       <Button title="Convert" onPress={handleConvert} />
//       <Text style={styles.result}>
//         Converted Amount: {convertedCurrency} {toCurrency}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     width: '80%',
//     marginVertical: 8,
//     backgroundColor: '#fff',
//   },
//   result: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
// });

// export default CurrencyConverterApp;







// import { View, Text, TextInput, Button } from 'react-native';

// const CurrencyConverterApp = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>hello</Text>
//     </View>
//   );
// };

// export default CurrencyConverterApp;

    
    
    
    
    
    
    
    // import React, { useState } from "react";
    //     import { SafeAreaView, StyleSheet, View, TextInput, Text, KeyboardAvoidingView } from "react-native";
    //     import { Button, Card, ActivityIndicator, Snackbar } from "react-native-paper";

    //     const CurrencyConverter = () => {
    //         const [amount, setAmount] = useState < string > (""); // Input amount as a string
    //         const [convertedAmount, setConvertedAmount] = useState < string | null > (null); // Converted amount as a string or null
    //         const [rate, setRate] = useState < number > (0); // Conversion rate
    //         const [isLoading, setIsLoading] = useState < boolean > (false); // Loading state
    //         const [snackbarVisible, setSnackbarVisible] = useState < boolean > (false); // Snackbar visibility
    //         const [snackbarMessage, setSnackbarMessage] = useState < string > ("");

    //         const fetchConversionRate = async () => {
    //             setIsLoading(true);
    //             try {
    //                 const response = await fetch(
    //                     "https://api.exchangerate-api.com/v4/latest/USD"
    //                 );
    //                 const data = await response.json();
    //                 const conversionRate = data.rates["EUR"]; // Example: USD to EUR
    //                 setRate(conversionRate);
    //                 setSnackbarMessage(`Conversion rate fetched: 1 USD = ${conversionRate} EUR`);
    //                 setSnackbarVisible(true);
    //             } catch (error) {
    //                 setSnackbarMessage("Error fetching conversion rate. Please try again.");
    //                 setSnackbarVisible(true);
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         };

    //         const calculateConversion = () => {
    //             const numericAmount = parseFloat(amount); // Parse amount as a number
    //             if (isNaN(numericAmount) || numericAmount <= 0) {
    //                 setSnackbarMessage("Please enter a valid amount greater than 0.");
    //                 setSnackbarVisible(true);
    //                 setConvertedAmount(null);
    //             } else if (rate === 0) {
    //                 setSnackbarMessage("Please fetch the conversion rate first.");
    //                 setSnackbarVisible(true);
    //             } else {
    //                 const convertedValue = (numericAmount * rate).toFixed(2); // Keep it as a string with 2 decimal places
    //                 setConvertedAmount(convertedValue);
    //             }
    //         };

    //         return (
    //             <SafeAreaView style={styles.container}>
    //                 <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
    //                     <Card style={styles.card}>
    //                         <Text style={styles.title}>Currency Converter</Text>
    //                         <TextInput
    //                             style={styles.input}
    //                             keyboardType="numeric"
    //                             placeholder="Enter amount in USD"
    //                             value={amount}
    //                             onChangeText={(text) => setAmount(text)}
    //                         />
    //                         <View style={styles.buttonContainer}>
    //                             <Button mode="contained" onPress={fetchConversionRate} disabled={isLoading}>
    //                                 {isLoading ? (
    //                                     <ActivityIndicator animating={true} color="#ffffff" />
    //                                 ) : (
    //                                     "Fetch Conversion Rate"
    //                                 )}
    //                             </Button>
    //                         </View>
    //                         <View style={styles.buttonContainer}>
    //                             <Button mode="contained" onPress={calculateConversion}>
    //                                 Convert to EUR
    //                             </Button>
    //                         </View>
    //                         {convertedAmount && (
    //                             <Text style={styles.result}>
    //                                 Converted Amount: €{convertedAmount}
    //                             </Text>
    //                         )}
    //                     </Card>
    //                 </KeyboardAvoidingView>

    //                 <Snackbar
    //                     visible={snackbarVisible}
    //                     onDismiss={() => setSnackbarVisible(false)}
    //                     duration={3000}
    //                 >
    //                     {snackbarMessage}
    //                 </Snackbar>
    //             </SafeAreaView>
    //         );
    //     };

    //     const styles = StyleSheet.create({
    //         container: {
    //             flex: 1,
    //             backgroundColor: "#f4f4f4",
    //         },
    //         innerContainer: {
    //             flex: 1,
    //             justifyContent: "center",
    //             alignItems: "center",
    //             paddingHorizontal: 20,
    //         },
    //         card: {
    //             width: "100%",
    //             padding: 20,
    //             borderRadius: 10,
    //             backgroundColor: "#ffffff",
    //             shadowColor: "#000",
    //             shadowOpacity: 0.2,
    //             shadowRadius: 4,
    //             elevation: 5,
    //         },
    //         title: {
    //             fontSize: 20,
    //             fontWeight: "bold",
    //             textAlign: "center",
    //             marginBottom: 20,
    //         },
    //         input: {
    //             height: 50,
    //             borderColor: "#ccc",
    //             borderWidth: 1,
    //             borderRadius: 10,
    //             paddingHorizontal: 15,
    //             marginBottom: 20,
    //             fontSize: 16,
    //         },
    //         buttonContainer: {
    //             marginBottom: 15,
    //         },
    //         result: {
    //             marginTop: 20,
    //             fontSize: 18,
    //             fontWeight: "bold",
    //             textAlign: "center",
    //             color: "#007BFF",
    //         },
    //     });

    //     export default CurrencyConverter;



    














// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Keyboard,
//   Alert,
//   TouchableWithoutFeedback,
// } from "react-native";
// import {
//   Text,
//   TextInput,
//   Button,
//   Card,
//   Menu,
//   ActivityIndicator,
//   Snackbar,
// } from "react-native-paper";

// const App = () => {
//   const [amount, setAmount] = useState("");
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("EUR");
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [error, setError] = useState("");
//   const [snackbarVisible, setSnackbarVisible] = useState(false);

//   const currencies = ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY", "CNY"];
//   const [menuVisibleFrom, setMenuVisibleFrom] = useState(false);
//   const [menuVisibleTo, setMenuVisibleTo] = useState(false);

//   const fetchExchangeRate = async () => {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       setError("Please enter a valid positive number for the amount.");
//       setSnackbarVisible(true);
//       return;
//     }
//     if (fromCurrency === toCurrency) {
//       setError("Please select different currencies to convert.");
//       setSnackbarVisible(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
//       );

//       const data = await response.json();
//       const rate = data.rates[toCurrency];
//       if (rate) {
//         setExchangeRate(rate);
//         setConvertedAmount(parseFloat((numericAmount * rate).toFixed(2)));

//       } else {
//         throw new Error("Rate not available for the selected currencies.");
//       }

//     } catch (error) {
//       const errorMessage = (error as Error).message || "Unable to fetch exchange rates.";
//       Alert.alert("Error", errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <View style={styles.container}>
//         <Text style={styles.header}>Currency Converter</Text>

//         <Card style={styles.card}>
//           <Card.Content>
//             <TextInput
//               label="Amount"
//               value={amount}
//               onChangeText={(text) => setAmount(text)}
//               keyboardType="numeric"
//               mode="outlined"
//               style={styles.input}
//             />

//             <View style={styles.currencySelector}>
//               <Menu
//                 visible={menuVisibleFrom}
//                 onDismiss={() => setMenuVisibleFrom(false)}
//                 anchor={
//                   <Button
//                     mode="outlined"
//                     onPress={() => setMenuVisibleFrom(true)}
//                     style={styles.menuButton}
//                   >
//                     From: {fromCurrency}
//                   </Button>
//                 }
//               >
//                 {currencies.map((currency) => (
//                   <Menu.Item
//                     key={currency}
//                     onPress={() => {
//                       setFromCurrency(currency);
//                       setMenuVisibleFrom(false);
//                     }}
//                     title={currency}
//                   />
//                 ))}
//               </Menu>

//               <Menu
//                 visible={menuVisibleTo}
//                 onDismiss={() => setMenuVisibleTo(false)}
//                 anchor={
//                   <Button
//                     mode="outlined"
//                     onPress={() => setMenuVisibleTo(true)}
//                     style={styles.menuButton}
//                   >
//                     To: {toCurrency}
//                   </Button>
//                 }
//               >
//                 {currencies.map((currency) => (
//                   <Menu.Item
//                     key={currency}
//                     onPress={() => {
//                       setToCurrency(currency);
//                       setMenuVisibleTo(false);
//                     }}
//                     title={currency}
//                   />
//                 ))}
//               </Menu>
//             </View>

//             <Button
//               mode="contained"
//               onPress={fetchExchangeRate}
//               style={styles.convertButton}
//               labelStyle={styles.buttonText}
//             >
//               Convert
//             </Button>
//           </Card.Content>
//         </Card>

//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             animating={true}
//             color="#6200ee"
//             style={styles.loading}
//           />
//         ) : convertedAmount ? (
//           <Text style={styles.result}>
//             {amount} {fromCurrency} = {convertedAmount} {toCurrency}
//           </Text>
//         ) : null}

//         <Snackbar
//           visible={snackbarVisible}
//           onDismiss={() => setSnackbarVisible(false)}
//           duration={3000}
//         >
//           {error}
//         </Snackbar>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#6200ee",
//     marginBottom: 20,
//   },
//   card: {
//     width: "90%",
//     padding: 20,
//     elevation: 4,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//   },
//   input: {
//     marginBottom: 20,
//   },
//   currencySelector: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   menuButton: {
//     width: "45%",
//   },
//   convertButton: {
//     backgroundColor: "#6200ee",
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//   },
//   loading: {
//     marginTop: 20,
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#4caf50",
//   },
// });

// export default App;



























// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",

//       }}
//     >
//       <Text style={{ color: 'red' }}>hi guys</Text>
//     </View>
//   );
// }