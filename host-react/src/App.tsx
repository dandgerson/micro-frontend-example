import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'

import { load } from 'growlers/store'
import Taps from 'growlers/Taps'
import Search from 'growlers/Search'
import Cart from 'growlers/Cart'

import DataComponent from 'growlers/DataComponent'

load('hv-taplist')

const App = () => (
  <ChakraProvider>
    <div
      style={{
        maxWidth: '960px',
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridColumnGap: '1rem',
      }}
    >
      <div>
        <Search />
        <Cart />
        <DataComponent>
          {({ filteredTaps }) => filteredTaps.map(({ beverageName }) => (
            <div key={beverageName}>
              {beverageName}
            </div>
          ))}
        </DataComponent>
      </div>
      <Taps />
    </div>
  </ChakraProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
