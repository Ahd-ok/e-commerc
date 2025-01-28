
export default function shortName(item, size) {
  return (item.length > size ? `${item.slice(1, size)} ...` : item)
}
