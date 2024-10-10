import * as React from 'react';
import '@/styles/TextBlock.css'

const TextBlock = ({ text, max }) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    };

    if (!text) {
        return null
    }

    return (
        <div
            className={`text-block ${isExpanded ? 'expanded' : ''}`}
            onClick={toggleExpand}
        >
            {isExpanded ? (
                <span>{text}</span>
            ) : (
                <span>{text.slice(0, max)}{text.length > max && '...'}</span>
            )}
        </div>
    )
}

export default TextBlock