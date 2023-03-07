import { Props as SettingProps, Setting } from './setting'

interface Props extends SettingProps {
    enabled?: boolean
    shortName?: string
    displayShortName?: boolean
}

class State {
    isEnabled: boolean

    constructor({isEnabled = false}: {isEnabled?: boolean}) {
        this.isEnabled = isEnabled
    }

    clone(params: {isEnabled?: boolean}) {
        return new State({...this, ...params})
    }
}

export class Flag extends Setting<Props, State> {
    constructor(props: Props) {
        super(props)

        let {enabled = false} = props

        this.state = new State({isEnabled: enabled})
        this.liftValue(enabled)
    }

    getState() {
        return new State(this.state)
    }

    getTypeLabel() {
        return 'flag'
    }

    decorateName() {
        return this.props.displayShortName && this.props.shortName ? `-${this.props.shortName}` : `--${this.props.name}`
    }

    liftValue(isEnabled: boolean) {
        this.props.setValue!(
            this.props.index!,
            isEnabled ? this.decorateName() : null
        )
    }

    handleClick(event: React.MouseEvent) {
        let isEnabled = !this.state.isEnabled
        this.setState(
            this.getState().clone(
                {
                    isEnabled: isEnabled
                }
            )
        )
        this.liftValue(isEnabled)
    }

    getChildren() {
        return <>
            <span className={this.state.isEnabled ? '' : 'disabled'}>{this.decorateName()}</span>
            <span className={`mark visible`}>{this.getTypeLabel()}</span>
        </>
    }
}
