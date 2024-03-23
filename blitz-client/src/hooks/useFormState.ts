import { useState } from "react"

const useFormState = <T>(formData: T) => {
    const [data, setData] = useState<typeof formData>(formData);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const reset = async () => setData(formData)

    return {data, handleChange, reset}
}

export default useFormState;