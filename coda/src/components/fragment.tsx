import { Setting, Props } from './setting'

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
            <span className={`mark visible`}>{this.getTypeLabel()}</span>
        </>
    }
}
