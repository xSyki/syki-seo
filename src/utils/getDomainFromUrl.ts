export function getDomainFromUrl(url: string) {
    return new URL('/', url).origin
}
