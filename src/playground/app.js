class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOptionSingular = this.handleDeleteOptionSingular.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
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


    componentWillUnmount() {
        console.log('component will unmount')
    }


    render() {
        const subtitle = "Put Your Life In The Hands Of A Computer."

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOptionSingular={this.handleDeleteOptionSingular}
                />
                <AddOption 
                    addOption={this.handleAddOption} 
                />
            </div>
        );
    }


    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }


    handleDeleteOptionSingular(option) {
        this.setState((prevState) => ({
            options: prevState.options.filter((o) => !(o === option))
        }))
    }


    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }


    handleAddOption(option) {
        if (!option) {
            return 'Error! Enter a valid value to add an option.'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Error! This option already exists.'
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
    }
}





const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}           
        </div>
    );
}
Header.defaultProps = {
    title: "Indecision App"
};





const Action = (props) => {
    return (
        <div>
            <button 
                disabled={!props.hasOptions} 
                onClick={props.handlePick}>
                What Should I Do?
            </button>
        </div>
    );
}





const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={() => {
                    props.handleDeleteOptionSingular(props.optionText)
                }}>
                Remove
            </button>
        </div>
    );
}





const Options = (props) => {
    return (
        <div>
            {
                props.options.map((option) => (
                    (<Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOptionSingular={props.handleDeleteOptionSingular}
                    />)
                ))
            }
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Add an option to get started.</p>}
        </div>
    );
}





class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }


    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }


    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value;    
        const error = this.props.addOption(option);

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = "";
        }
    }
}





ReactDOM.render(<IndecisionApp />, document.getElementById('app'));