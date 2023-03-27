export const formatDate = (dateTz: string) => {
    const date = new Date(dateTz)
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: "2-digit"
    })
}
export const formatDateWithTime = (dateTz: string) => {
    const date = new Date(dateTz)
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: "2-digit",
        minute: '2-digit',
        hour: '2-digit',
    }).replace(/\,/, '')
}