export function Input({ type = 'text', onChange }) {
	return (
		<input
			type={type}
			onChange={ev => onChange(ev.target.value)}
		/>
	)
}

export function ArrayInput({ value, onChange, seperator = ', ' }) {
	return (
		<Input
			value={value.join(seperator)}
			onChange={onChange}
		/>
	)
}