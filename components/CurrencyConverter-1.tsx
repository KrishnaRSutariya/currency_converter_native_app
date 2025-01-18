import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import axios from 'axios';

const { height } = Dimensions.get('window');

interface Country {
    id: number;
    name: string;
    code: string;
    symbol: string;
    exchange_rate: number;
    countries: string[];
    subunits: string[];
    description: string;
    image: string;
}

const CurrencyConverter = () => {
    const [currency, setCurrency] = React.useState<number>(100);
    const [currentRate, setCurrentRate] = React.useState<number>(0);
    const [country, setCountry] = React.useState<Country[] | []>([]);
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);

    React.useEffect(() => {
        axios
            .get('https://www.freetestapi.com/api/v1/currencies?sort=name&order=asc')
            .then((response) => {
                setCountry(response.data);

                const inrCurrency = response.data.find((item: Country) => item.code === 'INR');

                setCurrentRate(inrCurrency?.exchange_rate || 0);
            });
    }, []);

    const handleChangeCurrency = (text: string) => {
        if (!isNaN(Number(text))) {
            setCurrency(Number(text));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Currency Converter</Text>
            <View style={styles.mainBox}>
                <View style={styles.subBox}>
                    <Text style={styles.subHeadingText}>Enter Amount: (INR)</Text>
                    <TextInput
                        mode="outlined"
                        label="INR"
                        value={String(currency)}
                        onChangeText={handleChangeCurrency}
                        selectionColor="black"
                        cursorColor="black"
                        outlineColor="black"
                        activeOutlineColor="black"
                        textColor="black"
                        style={styles.inputBox}
                    />
                </View>
                {selectedCountry && (
                    <Text style={styles.showOutput}>
                        {`${currency}`} INR(₹) ={' '}
                        {parseFloat(((currency / currentRate) * selectedCountry.exchange_rate).toFixed(2))} {selectedCountry.symbol}
                    </Text>
                )}
                {/* <FlatList
                    data={country}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedCountry(item)}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={[styles.countryBox, { margin: 5, ...(selectedCountry?.id === item.id && { backgroundColor: 'orange' }) }]}
                            accessibilityLabel={`Select ${item.name}`}
                        >
                            <Image
                                source={{ uri: `https://flagsapi.com/${item.code.slice(0, 2)}/shiny/64.png` }}
                                width={50}
                                height={50}
                            />
                            <Text style={styles.countryText} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.countryCode}>({item.code})</Text>
                        </TouchableOpacity>
                    )}
                /> */}
                <ScrollView style={styles.scrollView}>
                    <View style={styles.subBox}>
                        {country.length > 0 ? (
                            country.map((item: Country) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedCountry(item)}
                                    style={[styles.countryBox]}
                                    key={item.id}
                                    accessibilityLabel={`Select ${item.name}`}
                                >
                                    <Image
                                        source={{ uri: `https://flagsapi.com/${item.code.slice(0, 2)}/shiny/64.png` }}
                                        width={50}
                                        height={50}
                                    />
                                    <Text style={styles.countryText} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.countryCode}>({item.code})</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={styles.loading}>
                                <ActivityIndicator animating={true} color={'white'} size="large" />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default CurrencyConverter;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        height: height - 40,
        backgroundColor: 'skyblue',
        borderRadius: 5,
    },
    loading: {
        width: '100%',
        height: height - 225,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        margin: 7,
        backgroundColor: 'orange',
        borderRadius: 5,
    },
    mainBox: {
        margin: 10,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    subBox: {
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    inputBox: {
        backgroundColor: 'white',
        minWidth: 123,
        maxWidth: 123,
    },
    showOutput: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: 'blue',
    },
    countryBox: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    countryText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    countryCode: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});
