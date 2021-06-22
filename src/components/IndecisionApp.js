import React from "react";
import Header from "./Header";
import AddOption from "./AddOption";
import Options from "./Options";
import Action from "./Action";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };


    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }


    handleDeleteOptionSingular = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((o) => !(o === option))
        }))
    }


    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }))
    }


    handleAddOption = (option) => {
        if (!option) {
            return 'Error! Enter a valid value to add an option.'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Error! This option already exists.'
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
    }


    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }


    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {
            // Do nothing, leave options as the default empty array
        }   
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json)
        }
    }


    render() {
        const subtitle = "Put Your Life In The Hands Of A Computer."

        return (
            <div>
                <Header subtitle={subtitle} />

                <div className="container">
                    <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                    />

                    <div className="widget">
                        <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOptionSingular={this.handleDeleteOptionSingular}
                        />
                        <AddOption 
                            addOption={this.handleAddOption} 
                        />
                    </div>
                    
                </div>
                
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}