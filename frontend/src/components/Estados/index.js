import React, { Component } from 'react'
import {View, Picker } from 'react-native'

export default  props => (
    <View >
        {
            props.data ?
                <Picker
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}
                >
                    {
                        props.data.map(estado =>
                            <Picker.Item key={estado} label={estado.sigla} value={estado} />)
                    }
                </Picker>
                :
                null
        }
    </View>
)