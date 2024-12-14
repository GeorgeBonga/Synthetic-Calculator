import React, { useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SyntheticItem from "./SyntheticItem";
import { ThemeContext } from "../theme/ThemeContext";

// Synthetic instruments data with names, symbols, and images
const syntheticInstrumentsData = [
      {
        name: "Volatility 10 Index",
        symbols: "R_10",
        image: require('../../assets/Derived/MarketDerivedVolatility10.png'),
        minLotSize: 0.5
      },
      {
        name: "Volatility 10 (1s) Index",
        symbols: "1HZ10V",
        image: require('../../assets/Derived/MarketDerivedVolatility101s.png'),
        minLotSize: 0.5
      },
      {
        name: "Volatility 25 Index",
        symbols: "R_25",
        image: require('../../assets/Derived/MarketDerivedVolatility25.png'),
        minLotSize: 0.5
      },
      {
        name: "Volatility 25 (1s) Index",
        symbols: "1HZ25V",
        image: require('../../assets/Derived/MarketDerivedVolatility251s.png'),
        minLotSize: 0.005
      },
      {
        name: "Volatility 50 Index",
        symbols: "R_50",
        image: require('../../assets/Derived/MarketDerivedVolatility50.png'),
        minLotSize: 4
      },
      {
        name: "Volatility 50 (1s) Index",
        symbols: "1HZ50V",
        image: require('../../assets/Derived/MarketDerivedVolatility501s.png'),
        minLotSize: 0.005
      },
      {
        name: "Volatility 75 Index",
        symbols: "R_75",
        image: require('../../assets/Derived/MarketDerivedVolatility75.png'),
        minLotSize: 0.001
      },
      {
        name: "Volatility 75 (1s) Index",
        symbols: "1HZ75V",
        image: require('../../assets/Derived/MarketDerivedVolatility751s.png'),
        minLotSize: 0.05
      },
      {
        name: "Volatility 100 Index",
        symbols: "R_100",
        image: require('../../assets/Derived/MarketDerivedVolatility100.png'),
        minLotSize: 0.5
      },
      {
        name: "Volatility 100 (1s) Index",
        symbols: "1HZ100V",
        image: require('../../assets/Derived/MarketDerivedVolatility1001s.png'),
        minLotSize: 0.2
      },
      {
        name: "Volatility 150 (1s) Index",
        symbols: "1HZ150V",
        image: require('../../assets/Derived/MarketDerivedVolatility1501s.png'),
        minLotSize: 0.01
      },
      {
        name: "Volatility 200 (1s) Index",
        symbols: "1HZ200V",
        image: require('../../assets/Derived/MarketDerivedVolatility2001s.png'),
        minLotSize: 0.02
      },
      {
        name: "Volatility 250 (1s) Index",
        symbols: "1HZ250V",
        image: require('../../assets/Derived/MarketDerivedVolatility2501s.png'),
        minLotSize: 0.005
      },
      {
        name: "Volatility 300 (1s) Index",
        symbols: "1HZ300V",
        image: require('../../assets/Derived/MarketDerivedVolatility3001s.png'),
        minLotSize: 1
      },


      {
        name: "Boom 300 Index",
        symbols: "BOOM300N",
        image: require('../../assets/Derived/MarketDerivedBoom300.png'),
        minLotSize: 1
      },
      {
        name: "Boom 500 Index",
        symbols: "BOOM500",
        image: require('../../assets/Derived/MarketDerivedBoom500.png'),
        minLotSize: 0.2
      },
      {
        name: "Boom 600 Index",
        symbols: "BOOM600",
        image: require('../../assets/Derived/MarketDerivedBoom600.png'),
        minLotSize: 0.2
      },
      {
        name: "Boom 900 Index",
        symbols: "BOOM900",
        image: require('../../assets/Derived/MarketDerivedBoom900.png'),
        minLotSize: 0.2
      },
      {
        name: "Boom 1000 Index",
        symbols: "BOOM1000",
        image: require('../../assets/Derived/MarketDerivedBoom1000.png'),
        minLotSize: 0.2
      },
      {
        name: "Crash 300 Index",
        symbols: "CRASH300N",
        image: require('../../assets/Derived/MarketDerivedCrash300.png'),
        minLotSize: 0.5
      },
      {
        name: "Crash 500 Index",
        symbols: "CRASH500",
        image: require('../../assets/Derived/MarketDerivedCrash500.png'),
        minLotSize: 0.2
      },
      {
        name: "Crash 600 Index",
        symbols: "CRASH600",
        image: require('../../assets/Derived/MarketDerivedCrash600.png'),
        minLotSize: 0.2
      },
      {
        name: "Crash 900 Index",
        symbols: "CRASH900",
        image: require('../../assets/Derived/MarketDerivedCrash900.png'),
        minLotSize: 0.2
      },
      {
        name: "Crash 1000 Index",
        symbols: "CRASH1000",
        image: require('../../assets/Derived/MarketDerivedCrash1000.png'),
        minLotSize: 0.2
      },
      {
        name: "Jump 10 Index",
        symbols: "JD10",
        image: require('../../assets/Derived/MarketDerivedJump10.png'),
        minLotSize: 0.01
      },
      {
        name: "Jump 25 Index",
        symbols: "JD25",
        image: require('../../assets/Derived/MarketDerivedJump25.png'),
        minLotSize: 0.01
      },
      {
        name: "Jump 50 Index",
        symbols: "JD50",
        image: require('../../assets/Derived/MarketDerivedJump50.png'),
        minLotSize: 0.01
      },
      {
        name: "Jump 75 Index",
        symbols: "JD75",
        image: require('../../assets/Derived/MarketDerivedJump75.png'),
        minLotSize: 0.01
      },
      {
        name: "Jump 100 Index",
        symbols: "JD100",
        image: require('../../assets/Derived/MarketDerivedJump100.png'),
        minLotSize: 0.01
      },
      {
        name: "Step Index",
        symbols: "stpRNG",
        image: require('../../assets/Derived/MarketDerivedStepIndices100.png'),
        minLotSize: 0.1
      },
      {
        name: "Step 200 Index",
        symbols: "stpRNG2",
        image: require('../../assets/Derived/MarketDerivedStepIndices200.png'),
        minLotSize: 0.1
      },
      {
        name: "Step 500 Index",
        symbols: "stpRNG5",
        image: require('../../assets/Derived/MarketDerivedStepIndices500.png'),
        minLotSize: 0.1
      },
      {
        name: "Range Break 100 Index",
        symbols: "RB100",
        image: require('../../assets/Derived/MarketDerivedRangeBreak100.png'),
        minLotSize: 0.01
      },
      {
        name: "Range Break 200 Index",
        symbols: "RB200",
        image: require('../../assets/Derived/MarketDerivedRangeBreak200.png'),
        minLotSize: 0.01
      },
      {
        name: "Bull Market Index",
        symbols: "RDBULL",
        image: require('../../assets/Derived/MarketDerivedBull.png'),
        minLotSize: 0.01
      },
      ,
      {
        name: "Bear Market Index",
        symbols: "RDBEAR",
        image: require('../../assets/Derived/MarketDerivedBear.png'),
        minLotSize: 0.01
      }
 
      
  
];

const SyntheticList = () => {
  const [syntheticInstruments, setSyntheticInstruments] = useState(syntheticInstrumentsData);
  const theme = useContext(ThemeContext);


  return (
    <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme.background }]}>
      {syntheticInstruments.map((instrument, index) => (
        <SyntheticItem
          key={index}
          name={instrument.name}
          image={instrument.image}
          symbols={instrument.symbols}
          minLotSize = {instrument.minLotSize}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});

export default SyntheticList;

