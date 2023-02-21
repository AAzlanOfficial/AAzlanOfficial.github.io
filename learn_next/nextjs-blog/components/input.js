export function TimeInput (props) {
    return (
        <div>
            <label for={props.id} title={props.title}>
            <input type="number" name="topics" id={props.id} />{props.title}
            </label>
        </div>
    )
}

export const TopicsCheckbox = ({title, value}) => {
    return (
        <div>
            <label for={value} title={title}>
                <input type="checkbox" name="topics" value={value} id={value} />{title}
            </label>
        </div>
    )
}