import { Setting, Props } from './setting'
import { Component } from './command'

export class Fragment extends Setting<Props, {}> {

    constructor(props: Props) {
        super(props)

        props.setValue!(props.index!, props.name)
    }

    getState() {
        return this.state
    }

    getTypeLabel() {
        return 'fragment'
    }

    handleClick() {}

    getChildren() {
        return <>
            {this.props.name}
            <Component className={`mark visible`}>{this.getTypeLabel()}</Component>
        </>
    }
}
