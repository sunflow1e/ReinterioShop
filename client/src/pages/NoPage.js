import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

export class NoPage extends Component {
  render() {
    return (
        <div classname = "Content">
        <div class = "Content">
        <div>Упс! Страница не найдена</div>
    </div>
    <Header />
    <Footer />
    </div>
    )
  }
}

export default NoPage