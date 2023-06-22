import React, { useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoCheckmarkDoneSharp, IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completedTodo } = props;
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const changeFocus = () => {
    setIsEditing(true);
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      updateTodo({ id, item: value });
      setIsEditing(false);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <motion.li
      initial={{
        x: '150vw',
        transition: { type: 'spring', duration: 2 }
      }}
      animate={{
        x: '0',
        transition: { type: 'spring', duration: 2 }
      }}
      whileHover={{ scale: 0.9, transition: { type: 'spring', duration: 1 } }}
      key={item.id}
      className='card'
    >
      <textarea
        ref={inputRef}
        disabled={!isEditing}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      ></textarea>
      <div className='btns'>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: 'black' }}
          onClick={() => changeFocus()}
        >
          <AiFillEdit />
        </motion.button>
        {!item.completed && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: 'green' }}
            onClick={() => completedTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: 'red' }}
          onClick={() => removeTodo(item.id)}
        >
          <IoClose />
        </motion.button>
      </div>
      {item.completed && <span className='completed'>Done</span>}
    </motion.li>
  );
};

export default TodoItem;
