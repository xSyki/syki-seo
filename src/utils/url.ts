export function getDomainFromUrl(url: string) {
    const urlClass = new URL('/', url)

    return urlClass.origin
}
