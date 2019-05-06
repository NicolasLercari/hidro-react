import React, { Component } from 'react';
import { Input } from 'antd';

const InputCantidad = props =>
    <Input {...props}  style={{ width: '120px', margin: '2px' }} placeholder="Kilos..." />;

export default InputCantidad;