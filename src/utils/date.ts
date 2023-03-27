export const formatDate = (dateTz: string) => {
    const date = new Date(dateTz)
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: "2-digit"
    })
}