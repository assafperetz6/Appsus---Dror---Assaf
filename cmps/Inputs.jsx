export function Input({ type = 'text', value = '', onChange }) {
	return (
		<input
			type={type}
			value={value}
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