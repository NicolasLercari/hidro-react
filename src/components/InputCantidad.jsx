import React, { Component } from 'react';
import { Input } from 'antd';

const InputCantidad = props =>
    <Input {...props}  style={{ width: '8%' }} placeholder="cantidad..." />;

export default InputCantidad;