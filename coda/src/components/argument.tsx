// import * as React from 'react'

// import { Tooltip } from './tooltip'
// import { Component } from './command'
import { State, Props, Parameter } from './parameter'

export class Argument extends Parameter<Props, State> {
    getState() {
        return new State(this.state)
    }

    getTypeLabel() {
        return 'argument'
    }
}

// export class Argument extends React.Component<Props, State> {
//     inputId: string
//     inputElement: React.RefObject<HTMLInputElement>
// 
//     // state: State
//     // props: Props
// 
//     constructor(props: Props) {
//         super(props)
// 
//         this.toggleIsEditable = this.toggleIsEditable.bind(this)
//         this.updateValue = this.updateValue.bind(this)
//         this.handleKeyDown = this.handleKeyDown.bind(this)
// 
//         this.state = new State({value: props.value ? props.value : ''})
//         this.inputId = `piece-input-${props.index}`
// 
//         this.inputElement = React.createRef()
//         
//         if (props.value !== undefined) {
//             this.liftValue(props.value)
//         }
//     }
// 
//     getState() {
//         return new State(this.state)
//     }
// 
//     componentDidUpdate() {
//         if (this.state.isEditable) {
//             this.inputElement.current!.focus()
//         }
//     }
// 
//     liftValue(value: string) {
//         this.props.setValue!(this.props.index as number, value)
//     }
// 
//     toggleIsEditable() {
//         this.setState(
//             this.getState().clone(
//                 {
//                     isEditable: !this.state.isEditable
//                 }
//             )
//         )
//     }
// 
//     updateValue(event: React.ChangeEvent<HTMLInputElement>) {
//         this.liftValue(event.target.value)
//         this.setState(
//             this.getState().clone(
//                 {
//                     value: event.target.value
//                 }
//             )
//         )
//     }
// 
//     handleKeyDown(event: React.KeyboardEvent) {
//         if (event.key === 'Enter' || event.key === 'Escape') {
//             this.toggleIsEditable()
//         }
//     }
// 
//     render() {
//         const tooltip = (
//             <>
//                 <strong>{this.props.name}:</strong> {this.props.description}
//             </>
//         )
// 
//         return (
//             <Tooltip content={tooltip}>
//                 <Component className={`command argument ${this.props.theme} ${this.props.optional ? 'optional' : ''}`} onClick={this.toggleIsEditable}>
//                     <span className={this.state.isEditable ? 'hidden' : 'visible'}>{this.state.value ? this.state.value : this.props.name}</span>
//                     <input
//                         type='text'
//                         id={this.inputId}
//                         className={this.state.isEditable ? 'visible' : 'hidden'}
//                         onChange={this.updateValue}
//                         onKeyDown={this.handleKeyDown}
//                         ref={this.inputElement}
//                         style={{width: this.state.inputWidth + 'ch'}}
//                         value={this.state.value}
//                     />
//                 </Component>
//             </Tooltip>
//         )
//     }
// }
