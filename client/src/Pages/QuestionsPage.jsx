import { useState } from 'react';
import { QuestionCard } from '@/Components';
import { useParams } from 'react-router-dom';
import { questionsByTopics } from '@/DummyData/questions.js';
import { topics } from '@/DummyData/topics';

export default function QuestionsPage() {
    const { topicId } = useParams();

    const topicQuestions = questionsByTopics[topicId] || [];

    const topic = topics.find((t) => t.id === topicId);

    const [filter, setFilter] = useState('all');

    const filteredQuestions = topicQuestions.filter((q) => {
        if (filter === 'all') return true;
        if (filter === 'solved') return q.solved;
        if (filter === 'unsolved') return !q.solved;
        return q.difficulty === filter;
    });

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    {topic.name} Questions ({topicQuestions.length})
                </h1>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-[#4977ec] text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('solved')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'solved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Solved
                    </button>
                    <button
                        onClick={() => setFilter('unsolved')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'unsolved' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Unsolved
                    </button>
                    <button
                        onClick={() => setFilter('easy')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'easy' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => setFilter('medium')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => setFilter('hard')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'hard' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Hard
                    </button>
                </div>
            </div>

            <div className="">
                {filteredQuestions.length
                    ? filteredQuestions.map((question) => (
                          <QuestionCard
                              key={question.questionId}
                              question={question}
                          />
                      ))
                    : 'No such Questions there.'}
            </div>
        </div>
    );
}
