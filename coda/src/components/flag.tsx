import { Props as SettingProps, Setting } from './setting'

interface Props extends SettingProps {
    enabled?: boolean
    shortName?: string
}

class State {
    isEnabled: boolean
    displayShortName: boolean

    constructor({isEnabled = false, displayShortName = false}: {isEnabled?: boolean, displayShortName?: boolean}) {
        this.isEnabled = isEnabled
        this.displayShortName = displayShortName
    }

    clone(params: {isEnabled?: boolean, displayShortName?: boolean}) {
        return new State({...this, ...params})
    }
}

export class Flag extends Setting<Props, State> {
    constructor(props: Props) {
        super(props)

        let {enabled = false} = props

        const state = new State({isEnabled: enabled})
        this.state = state
        this.liftValue(state)
    }

    getState() {
        return new State(this.state)
    }

    getTypeLabel() {
        return 'flag'
    }

    decorateName(state: State) {
        return state.displayShortName && this.props.shortName ? `-${this.props.shortName}` : `--${this.props.name}`
    }

    liftValue(state: State) {
        this.props.setValue!(
            this.props.index!,
            state.isEnabled ? this.decorateName(state) : null
        )
    }

    handleClick(event: React.MouseEvent) {
        const state = this.getState().clone(
            {
                isEnabled: !this.state.isEnabled
            }
        )
        this.setState(state)
        this.liftValue(state)
    }

    setDisplayShortName(value: boolean) {
        const state = this.getState().clone(
            {
                displayShortName: value
            }
        )
        this.setState(state)
        this.liftValue(state)
    }

    getChildren() {
        return <>
            <span className={this.state.isEnabled ? '' : 'disabled'}>{this.decorateName(this.state)}</span>
            <span className={`mark visible`}>{this.getTypeLabel()}</span>
        </>
    }
}
