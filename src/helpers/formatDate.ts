export const formatDate = (data: Date) => {
    const D = new Date(data);
    const date = D.toLocaleDateString('ru')

    const hours = D.getHours() < 10 ? `0${D.getHours() }` : D.getHours()
    const minutes = D.getHours() < 10 ? `0${D.getMinutes() }` : D.getMinutes();

    const time = `${hours}:${minutes}`

    return {
        date,
        time
    }
}
