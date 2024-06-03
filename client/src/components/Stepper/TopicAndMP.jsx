import { useState } from 'react';
import education from '/Education.svg';
import art from '/Art.svg';
import sports from '/Sports.svg';
import ciencia from '/Ciencia.svg';
import politica from '/Politica.svg';
import literatura from '/Literatura.svg';

const TopicAndMP = ({ onTopicSelect }) => {
    const [selectedTopic, setSelectedTopic] = useState('');

    const topics = [
        { id: 'educacion', name: 'Educación', img: education },
        { id: 'arte', name: 'Arte', img: art },
        { id: 'deportes', name: 'Deportes', img: sports },
        { id: 'ciencia', name: 'Ciencia', img: ciencia },
        { id: 'politica', name: 'Política', img: politica },
        { id: 'literatura', name: 'Literatura', img: literatura },
    ];

    const handleTopicClick = (topicId) => {
        setSelectedTopic(topicId);
        onTopicSelect(topicId);
    };

    return (
        <div>
            <div className='flex items-center space-x-6 text-center justify-center'>
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        onClick={() => handleTopicClick(topic.id)}
                        className={`cursor-pointer ${selectedTopic === topic.id ? 'topic-selected' : ''}`}
                    >
                        <img src={topic.img} className='w-16 h-16' alt={topic.name} />
                        <span className='text-sm'>{topic.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicAndMP;
