import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'

const Heading = ({name}) => (
  <div className="flex items-center">
    {name === 'gaming' && (
      <>
        <h1>Gaming</h1>
        <SiYoutubegaming />
      </>
    )}
    {name === 'trending' && (
      <>
        <h1>Trending</h1>
        <FaFireAlt />
      </>
    )}
    {name === 'saved' && (
      <>
        <h1>Saved</h1>
        <RiMenuAddLine />
      </>
    )}
  </div>
)

export default Heading;