import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import './App.css';
import alarmSound from './sounds/alarma-diminetii.mp3';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [showTable, setShowTable] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [taskHour, setTaskHour] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [enableAlarm, setEnableAlarm] = useState(false);
  const [audio] = useState(new Audio(alarmSound));
  const [notificationHour, setNotificationHour] = useState(0);
  const [notificationMinute, setNotificationMinute] = useState(0);

  const tasksInitialState = {
    overdue: [],
    upcoming: [],
    completed: [],
    canceled: [],
  };
  const [tasks, setTasks] = useState(tasksInitialState);

  const emojis = [
   '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
   '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', 
   '😋', '😛', '😜', '😝', '🤑', '🤗', '🤔', '🤐', '😒',
   '😓', '😔', '😕', '🙁', '😖', '😞', '😟', '😤', '😢', 
   '😦', '😧', '😨', '😩', '😬', '😰', '😱', '😳', '😵', 
   '😡', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', 
   '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺',
   '👻', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', 
   '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💥', '💫',
   '💨', '🐵', '🐒', '🦍', '🐶', '🐕', '🐩', '🐺', '🦊', 
   '🐱', '🐈', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄',
   '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽',
   '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛',
   '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️', '🦔', '🦇', '🐻',
   '🐼', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤',
   '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦚', '🦜', 
   '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🌵',
   '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋',
   '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌺',
   '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖',
   '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏',
   '🌌', '🌠', '⭐', '🌟', '💫', '✨', '☄️', '☀️', '🌤️', 
   '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '⚡', '🔥', '💥',
   '❄️', '🌨️', '☃️', '⛄', '🌬️', '💨', '🌪️', '🌫️', '🌈',
   '☔', '💧', '💦', '🌊', '🍏', '🍎', '🍐', '🍊', '🍋',
   '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥭', '🥥',
   '🍅', '🍆', '🥑', '🥒', '🥦', '🌶️', '🌽', '🥕', '🥔',
   '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏',
   '🍑', '🍒', '🍓', '🥝', '🥑', '🍅', '🍆', '🥒', '🌽',
   '🥔', '🥥', '🥦', '🍄', '🥜', '🌰', '🍞', '🥐', '🥖',
   '🥯', '🥞', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', 
   '🌭', '🍲', '🍳', '🥘', '🍿', '🧂', '🥣', '🥗', '🍜',
   '🍠', '🍢', '🍣', '🍤', '🍥', '🍡', '🥟', '🥠', '🥡',
   '🦐', '🦑', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰',
   '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥤', '☕',
   '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃',
   '🍴', '🥄', '🔪', '🏺', '🌍', '🗺️', '🏔️', '⛰️', '🏕️',
   '🌄', '🌅', '🌠', '🌈', '🎇', '🎆', '🌌', '🌃', '🌉',
   '🏙️', '🌇', '🌆', '🏰', '🏯', '🏠', '🏡', '🏘️', '🏚️',
   '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩',
   '🏛️', '⛪', '🕌', '🕍', '🛕', '🕋', '⛩️', '🛤️', '🛣️',
   '🎑', '🏞️', '🌅', '🌄', '🌠', '🌈', '🎇', '🎆', '🌌', 
   '🌉', '🌁', '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', 
   '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '🧮', '🎥', 
   '📽️', '🎬', '📺', '📷', '📸', '📹', '📼', '🔍', '🔎', 
   '💡', '🔦', '🏮', '🕰️', '🌅', '🌄', '🌠', '🌈', '🎇',
 ];

 useEffect(() => {
  if (enableNotifications) {
    const now = new Date();
    const notificationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      notificationHour,
      notificationMinute,
      0
    );

    if (notificationTime > now) {
      const timeout = notificationTime - now;
      const timeoutId = setTimeout(() => {
        const notification = new Notification('Task-uri de îndeplinit', {
          body: getNotificationMessage(),
        });
      }, timeout);

      return () => clearTimeout(timeoutId);
    }
  }
}, [enableNotifications, tasks, notificationHour, notificationMinute]);

const getNotificationMessage = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(notificationHour, notificationMinute, 0, 0);

  const allTasks = [
    ...tasks.upcoming,
    ...tasks.overdue,
    ...tasks.completed,
    ...tasks.canceled,
  ];

  const tasksToComplete = allTasks
    .filter(
      (task) =>
        !task.isCompleted &&
        !task.isCanceled &&
        task.dueDate.getDate() === tomorrow.getDate() &&
        task.dueDate.getMonth() === tomorrow.getMonth() &&
        task.dueDate.getFullYear() === tomorrow.getFullYear()
    )
    .map((task) => `- ${task.title} la ${formatDate(task.dueDate)}`)
    .join('\n');

  if (tasksToComplete.trim() === '') {
    return 'Nu ați adăugat task-uri.';
  }

  return `Aveți următoarele task-uri de îndeplinit mâine:\n${tasksToComplete}`;
};

 const handleTaskSubmit = () => {
  if (taskTitle.trim() === '') {
    alert('Introduceți un titlu pentru task.');
    return;
  }

  setTasks((prevTasks) => ({
    ...prevTasks,
    upcoming: [
      ...prevTasks.upcoming,
      {
        title: taskTitle,
        id: Date.now(),
        dueDate: new Date(date.setHours(taskHour, 0, 0, 0)),
        emoji: selectedEmoji,
        isCompleted: false,
        isCanceled: false,
      },
    ],
  }));

  setTaskTitle('');
  setShowTable(false);
};

  const filterTasksByDate = (tasks, selectedDate) => {
    const filteredTasks = {};
    Object.keys(tasks).forEach((category) => {
      filteredTasks[category] = tasks[category].filter(
        (task) =>
          task.dueDate.getDate() === selectedDate.getDate() &&
          task.dueDate.getMonth() === selectedDate.getMonth() &&
          task.dueDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    return filteredTasks;
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleAddButtonClick = () => {
    setShowTable(true);
  };

  const handleTaskCompleteToggle = (categoryId, taskId) => {
    setTasks((prevTasks) => {
      const taskToToggle = prevTasks[categoryId].find((task) => task.id === taskId);

      if (!taskToToggle) {
        return prevTasks;
      }

      const updatedTasks = {
        ...prevTasks,
        [categoryId]: prevTasks[categoryId].filter((task) => task.id !== taskId),
        completed: [...prevTasks.completed, { ...taskToToggle, isCompleted: !taskToToggle.isCompleted, isCanceled: false }],
      };

      return updatedTasks;
    });
  };

  const handleTaskCancelToggle = (categoryId, taskId) => {
    setTasks((prevTasks) => {
      const taskToToggle = prevTasks[categoryId].find((task) => task.id === taskId);

      if (!taskToToggle) {
        return prevTasks;
      }

      const updatedTasks = {
        ...prevTasks,
        [categoryId]: prevTasks[categoryId].filter((task) => task.id !== taskId),
        canceled: [...prevTasks.canceled, { ...taskToToggle, isCanceled: !taskToToggle.isCanceled, isCompleted: false }],
      };

      return updatedTasks;
    });
  };

  const handleTaskOverdueToggle = (categoryId, taskId) => {
    setTasks((prevTasks) => {
      const taskToToggle = prevTasks[categoryId].find((task) => task.id === taskId);

      if (!taskToToggle) {
        return prevTasks;
      }

      const updatedTasks = {
        ...prevTasks,
        [categoryId]: prevTasks[categoryId].filter((task) => task.id !== taskId),
        overdue: [...prevTasks.canceled, { ...taskToToggle, isOverdue: !taskToToggle.isOverdue, isCompleted: false }],
      };

      return updatedTasks;
    });
  };

  const handleTaskDelete = (categoryId, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [categoryId]: prevTasks[categoryId].filter((task) => task.id !== taskId),
    }));
  };
 
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };
  

  const formatDate = (date) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
};

  return (
    <div>
      <h1>Power Task</h1>
      <div>
        <button onClick={handleAddButtonClick}>ADD</button>
      </div>
      <Calendar
  onChange={onChange}
  value={date}
  minDate={new Date()} 
/>
      {showTable && (
        <div>
          <h2>Alegeți emoticonul, ora și introduceți task-ul:</h2>
          <select
            value={selectedEmoji}
            onChange={(e) => setSelectedEmoji(e.target.value)}
          >
            {emojis.map((emoji) => (
              <option key={emoji} value={emoji}>
                {emoji}
              </option>
            ))}
          </select>
          <select
             value={taskHour}
             onChange={(e) => setTaskHour(e.target.value)}
          >
            {[...Array(24).keys()].map((hour) => (
          <option key={hour} value={hour}>
            {hour < 10 ? `0${hour}` : hour}:00
          </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Introduceți titlul task-ului"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button onClick={handleTaskSubmit}>Adaugă Task</button>
        </div>
      )}
      <div>
        <table>
          <thead>
            <tr>
              <th>Overdue</th>
              <th>Upcoming</th>
              <th>Completed</th>
              <th>Canceled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul>
                {filterTasksByDate(tasks, date).overdue.map((task) => (
                    <li key={task.id}>
                      {task.title} {task.emoji} {formatDate(task.dueDate)}
                      <button
                        onClick={() => handleTaskDelete('overdue', task.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                {filterTasksByDate(tasks, date).upcoming.map((task) => (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleTaskCompleteToggle('upcoming', task.id)}
                      />
                      <FaCheck className="check-mark" />
                      <input
                        type="checkbox"
                        checked={task.isOverdue}
                        onChange={() => handleTaskOverdueToggle('upcoming', task.id)}
                      />
                      <FaClock className="clock-mark" />
                      <input
                        type="checkbox"
                        checked={task.isCanceled}
                        onChange={() => handleTaskCancelToggle('upcoming', task.id)}
                      />
                      <FaTimes className="cancel-mark" />
                      {task.title} {task.emoji} {formatDate(task.dueDate)}
                      <button
                        onClick={() => handleTaskDelete('upcoming', task.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {filterTasksByDate(tasks, date).completed.map((task) => (
                    <li key={task.id}>
                      {task.title} {task.emoji} {formatDate(task.dueDate)}
                      <button
                        onClick={() => handleTaskDelete('completed', task.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {filterTasksByDate(tasks, date).canceled.map((task) => (
                    <li key={task.id}>
                      {task.title} {task.emoji} {formatDate(task.dueDate)}
                      <button
                        onClick={() => handleTaskDelete('canceled', task.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleSettingsClick}>Setări</button>
      {showSettings && (
      <div>
      <div>
        <label>
          Activare notificare
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            value={enableNotifications ? 1 : 0}
            onChange={(e) => {
              setEnableNotifications(e.target.value === '1');
              alert(
                `Notificările au fost ${
                  enableNotifications ? 'dezactivate' : 'activate'
                }!`
              );
            }}
          />
          <div>
          <label>
            Ora notificării
          <input
            type="number"
            min="0"
            max="23"
            value={notificationHour}
            onChange={(e) => setNotificationHour(Number(e.target.value))}
          />
          </label>
          <label>
            Minutele notificării
          <input
            type="number"
            min="0"
            max="59"
            value={notificationMinute}
            onChange={(e) => setNotificationMinute(Number(e.target.value))}
          />
          </label>
          </div>
        </label>
      </div>
      <div>
              <label>
                Activare alarmă
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="1"
                  value={enableAlarm ? 1 : 0}
                  onChange={(e) => {
                    setEnableAlarm(e.target.value === '1');
                    if (e.target.value === '1') {
                      // Redă melodia când alarmă este activată
                      audio.play().catch((error) => {
                        console.error('Eroare la redarea melodiei:', error);
                      });
                    } else {
                      // Oprește melodia când alarmă este dezactivată
                      audio.pause();
                      audio.currentTime = 0;
                    }
                    alert(
                      `Alarma a fost ${
                        enableAlarm ? 'dezactivată' : 'activată'
                      }!`
                    );
                  }}
                />
              </label>
            </div>
          </div>
      )}
    </div>
  );
};

export default App;