type SearchProps = {
  searchTerm: string
  onChangeSearchTerm: (val: string) => void
}

export const Search = ({ searchTerm, onChangeSearchTerm }: SearchProps) => {
  return (
    <div className="mx-auto my-16 w-1/3 ">
      <div className="text-gray-400">
        <input
          type="text"
          className="w-full px-12"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
