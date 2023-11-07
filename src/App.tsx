import React, { useEffect, useState } from 'react'

import type { GameItemProps } from './common/types'
import { GameItems } from './utils'
import { apiPostRequest } from './utils/api'

import './index.css'

const App: React.FC = () => {
  // const [users, setUsers] = useState<string[]>([])
  const [text, setText] = useState<string>('')
  const [type, setType] = useState<string>('')
  // const [label, setLabel] = useState<string>('')
  const [gameItemsObj, setGameItemsObj] = useState<{
    [key: string]: GameItemProps
  }>({})
  const [error, setError] = useState<string>('')
  const [value, setValue] = useState<string | number>()
  const [object, setObject] = useState<string>('')

  useEffect(() => {
    if (GameItems && GameItems.length > 0) {
      setType(GameItems[0].type)
      // setLabel(GameItems[0].label)
      setObject(GameItems[0]['object'])

      const _obj = GameItems.reduce(
        (previuse, current) => ({
          ...previuse,
          [current.object]: current,
        }),
        {},
      )
      setGameItemsObj(_obj)
    }
  }, [GameItems])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value

    setType(gameItemsObj[key].type)
    setObject(key)
  }
  const handleSelectValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const key = event.target.value

    setValue(key)
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(event.target.value)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (text && object && value) {
      const res = await apiPostRequest('user/update', {
        object,
        value,
        wallets: text,
      })
      // if (res.success) 
      if (res.success) setError('succeed')
    } else {
      setError('Invalid data')
    }
    return false
  }

  return (
    <main>
      <div className="p-36 w-[50%] m-auto">
        <div className="mb-8">
          <h3 className="text-xl font-bold">ElonMars Administrator Panel</h3>
        </div>
        <form method="POST" action="" onSubmit={handleSubmit}>
          <div className="rounded-lg border border-slate-500 mb-2 p-8">
            <div>
              <h4 className="text-lg mb-2">Update Users</h4>
              <p className="mb-2">
                Please update variables for following users
              </p>
            </div>
            <div className="mb-2">
              <textarea
                className="w-full rounded-lg"
                name="users"
                rows={10}
                onChange={handleTextAreaChange}
              ></textarea>
            </div>
            <div className="row grid grid-cols-2">
              <div className="">
                <div className="mb-2">
                  <div className="mb-1">
                    <label>Objects</label>
                  </div>
                  <div>
                    <select
                      className="w-full rounded-lg"
                      onChange={handleSelectChange}
                      name="item"
                      value={object}
                    >
                      {GameItems.map((item: GameItemProps, key: number) => (
                        <option key={key} value={item.object}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="mb-1">
                    <label>{type === 'date' ? 'Start Date' : 'Amount'}</label>
                  </div>
                  <div>
                    {type !== 'select' && (
                      <input
                        className="w-full rounded-lg"
                        value={value}
                        type={type}
                        name="value"
                        onChange={handleValueChange}
                      />
                    )}
                    {type === 'select' && (
                      <select
                        className="w-full rounded-lg"
                        onChange={handleSelectValueChange}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="my-4">
                  <button
                    className="w-full px-8 py-2 font-semibold text-md bg-cyan-500 text-white rounded-lg shadow-sm"
                    type="submit"
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
            {error && <div className="text-rose-500">{error}</div>}
          </div>
        </form>
      </div>
    </main>
  )
}

export default App
