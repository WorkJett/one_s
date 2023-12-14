import {useState, useRef} from 'react'

import menu_icon from 'assets/menu.svg'
import close_icon from 'assets/close.svg'
import sin_icon from 'assets/sin.svg'
import hor_icon from 'assets/hor.svg'
import ver_icon from 'assets/ver.svg'

import {
  useAppContext,
  MODE_SIN, MODE_HOR, MODE_VER,
} from 'lib'

export const SideBar = () => {
  const {mode, set_mode, tables} = useAppContext()
  const [is_open, set_is_open] = useState(false)
  const t1_input_ref = useRef()
  const t2_input_ref = useRef()

  const on_menu = () => {
    set_is_open(is_open => !is_open)
  }

  if (!is_open) return (
    <div className="side-bar__menu_btn" onClick={on_menu}>
      <img src={menu_icon} />
    </div>
  )

  const on_sin = () => {
    set_mode(MODE_SIN)
    set_is_open(false)
  }

  const on_hor = () => {
    set_mode(MODE_HOR)
    set_is_open(false)
  }

  const on_ver = () => {
    set_mode(MODE_VER)
    set_is_open(false)
  }

  const on_load = async () => {
    if (t1_input_ref &&
        t1_input_ref.current &&
        t1_input_ref.current.value) {
      const {value} = t1_input_ref.current
      const t1_res = await fetch(value).then(res => res.json())
      if (t1_res.length > 0) {
        t1_res.forEach(item => {
          tables[0].rows[item.row].cells[item.col].set_content(item.value)
        })
      }
    }
    if (t2_input_ref &&
        t2_input_ref.current &&
        t2_input_ref.current.value) {
      const {value} = t2_input_ref.current
      const t2_res = await fetch(value).then(res => res.json())
      if (t2_res.length > 0) {
        t2_res.forEach(item => {
          tables[1].rows[item.row].cells[item.col].set_content(item.value)
        })
      }
    }
  }

  return (
    <div className="side_bar__menu">
      <div className="side_bar__close_btn" onClick={on_menu}>
        <img src={close_icon} />
      </div>
      <div className="side_bar__modes">
        <div className="side_bar__mode_btn" onClick={on_sin}>
          <img src={sin_icon} />
        </div>
        <div className="side_bar__mode_btn" onClick={on_hor}>
          <img src={hor_icon} />
        </div>
        <div className="side_bar__mode_btn" onClick={on_ver}>
          <img src={ver_icon} />
        </div>
      </div>
      <div className="side_bar__urls">
        <div className="side_bar__url">
          <div className="side_bar__label">table 1 url</div>
          <input className="side_bar__input" ref={t1_input_ref} />
        </div>
        <div className="side_bar__url">
          <div className="side_bar__label">table 2 url</div>
          <input className="side_bar__input" ref={t2_input_ref} />
        </div>
        <div className="side_bar__load_btn">
          <button onClick={on_load}>Load json data</button>
        </div>
      </div>
    </div>
  )
}
