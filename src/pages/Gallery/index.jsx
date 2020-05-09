import React, { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react'
import { Button, BackTop, Drawer, Radio, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { DoubleRightOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { parseTime, debounce } from '@/utils/common'
import useDidUpdate from '@/hooks/useDidUpdate'
import Box from './Box'
import './index.less'

const DIVIDE_SYMBOL = '__'

const BOX_SIZE = {
  S: 256,
  M: 335,
  L: 600
}

const SORT_RULES = ['dirName', 'createTime', 'size']

const BEGIN_LEN_PER_COL = 4

const after = (times, func) => (...args) => {
  if (--times < 1) {
    return func.apply(this, args)
  }
}

const findMinHeight = heightArr => {
  let minIndex = -1
  let minHeight = Number.MAX_SAFE_INTEGER
  heightArr.forEach((height, i) => {
    if (height < minHeight) {
      minHeight = height
      minIndex = i
    }
  })
  return [minIndex, minHeight]
}

export default function Gallery() {
  const dispatch = useDispatch()
  const imgs = useSelector(state => state.gallery.imgs)

  // dirName createTime , size
  const [sortKey, setSortKey] = useState('dirName')
  // asc desc
  const [sortType, setSortType] = useState('asc')
  const [visibile, setVisibile] = useState(false)

  const [colCount, setColCount] = useState(0)
  const [imageCount, setImageCount] = useState(0)
  const [boxWidth, setBoxWidth] = useState(BOX_SIZE.S)

  const [fetchLoading, setFetchLoading] = useState(false)
  const [cleanLoading, setCleanLoading] = useState(false)

  const galleryRef = useRef(null)

  const oldImageCountRef = useRef(0)

  const setImageCount2 = useCallback(
    newImageCount => {
      oldImageCountRef.current = imageCount
      setImageCount(newImageCount)
    },
    [imageCount]
  )

  const queryImages = useCallback(
    () => {
      return dispatch.gallery.queryImages({ sortType, sortKey })
    },
    [dispatch.gallery, sortKey, sortType]
  )

  const handleFetch = useCallback(
    () => {
      setFetchLoading(true)
      dispatch.gallery.fetchGallery().then(() => {
        setFetchLoading(false)
        queryImages()
      })
    },
    [dispatch.gallery, queryImages]
  )
  const handleClean = useCallback(
    () => {
      setCleanLoading(false)
      dispatch.gallery.cleanGallery().then(() => {
        setCleanLoading(false)
        queryImages()
      })
    },
    [dispatch.gallery, queryImages]
  )

  const getColCount = useCallback(() => Math.floor(Math.max(galleryRef.current.offsetWidth / boxWidth, 1)), [boxWidth])

  const waterfallLayout = useCallback(
    () => {
      const heightArr = []
      const boxs = document.querySelectorAll('.box')
      const padding = Math.floor((galleryRef.current.offsetWidth - boxWidth * colCount) / (colCount + 1))
      // console.log(galleryRef.current.offsetWidth, colCount, boxs.length, padding)

      for (let i = 0; i < boxs.length; i++) {
        const box = boxs[i]
        if (box) {
          const boxHeight = box.offsetHeight
          box.style.position = 'absolute'
          if (i < colCount) {
            heightArr.push(boxHeight)
            box.style.top = '0px'
            box.style.left = i * (boxWidth + padding) + padding + 'px'
          } else {
            const [minBoxIndex, minBoxHeight] = findMinHeight(heightArr)
            box.style.top = minBoxHeight + 'px'
            box.style.left = minBoxIndex * (boxWidth + padding) + padding + 'px'
            // 关键:更新最矮盒子的高度
            heightArr[minBoxIndex] += boxHeight
          }
        }
      }
    },
    [boxWidth, colCount]
  )

  useEffect(() => {
    queryImages().then(() => {
      const colCount = getColCount()
      setColCount(colCount)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useDidUpdate(() => {
    queryImages()
  }, [queryImages])

  // 绑定滚动和resize事件
  useEffect(() => {
    function scrollHandler(e) {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if (scrollTop + clientHeight === scrollHeight) {
        setImageCount2(imageCount => imageCount + colCount * BEGIN_LEN_PER_COL)
      }
    }

    function resizeHandler() {
      const newColCount = getColCount()
      if (newColCount === colCount) {
        waterfallLayout()
      } else {
        setColCount(newColCount)
      }
    }

    const scrollContainer = document.querySelector('.main-layout')
    scrollContainer.addEventListener('scroll', scrollHandler)

    const debounceResizeHandler = debounce(resizeHandler, 500)
    window.addEventListener('resize', debounceResizeHandler)

    return () => {
      window.removeEventListener('resize', debounceResizeHandler)
      scrollContainer.removeEventListener('scroll', scrollHandler)
    }
  }, [colCount, getColCount, setImageCount2, waterfallLayout])

  // 当boxWidth或colCount改变的时候，自动触发布局算法
  useEffect(() => {
    // console.log('effect...')
    waterfallLayout()
  }, [waterfallLayout])

  // 当boxWidth改变的时候，异步改变colCount
  useEffect(() => {
    setColCount(getColCount())
  }, [getColCount])

  // 当colCount改变的时候，异步改变imageCount
  useLayoutEffect(() => {
    setImageCount2(imageCount => Math.max(imageCount, colCount * BEGIN_LEN_PER_COL))
  }, [colCount, setImageCount2])

  const handleImageLoad = (function () {
    if (imageCount === 0) return () => { }
    return after(imageCount - oldImageCountRef.current, () => {
      // console.log('imageload...')
      waterfallLayout()
    })
  }())

  const sortMenu = (
    <Menu
      onClick={({ key }) => setSortKey(key)}
      selectedKeys={[sortKey]}
    >
      {SORT_RULES.map(rule => (
        <Menu.Item key={rule}>
          {rule}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className='gallery' ref={galleryRef}>

      <div className='gallery-waterfall'>
        {
          imgs.slice(0, imageCount).map((image, index) => {
            const { name, size, createTime, dirName } = image
            // const src = `http://127.0.0.1:7001/images/${dirName}/${name}`
            const src = `/images/${dirName}/${name}`
            return (
              <Box
                key={name}
                src={src}
                text={`${dirName.split(DIVIDE_SYMBOL)[0]}-${name.split(DIVIDE_SYMBOL)[0]}-${Math.floor(size)}kb-${parseTime(createTime)}`}
                style={{ width: boxWidth }}
                onClick={() => window.open(src)}
                onLoad={handleImageLoad}
              />
            )
          })
        }
      </div>

      <DoubleRightOutlined onClick={() => setVisibile(true)} className='gallery-expand-icon' />

      <Drawer
        closable={false}
        visible={visibile}
        placement='left'
        width={250}
        onClose={() => setVisibile(false)}
        className='gallery-drawer'
      >
        <div className='tool-group'>
          <h4>图片大小: </h4>
          <Radio.Group
            value={boxWidth}
            onChange={e => setBoxWidth(e.target.value)}
            buttonStyle='solid'
          >
            {Object.keys(BOX_SIZE).map(size => (
              <Radio.Button key={size} value={BOX_SIZE[size]}>
                {size}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className='tool-group'>
          <h4>操作: </h4>
          <div className='btn-wrapper'>
            <Button onClick={handleFetch} loading={fetchLoading}>Fetch</Button>
            <Button onClick={handleClean} loading={cleanLoading}>Clean</Button>
          </div>
        </div>
        <div className='tool-group'>
          <h4>排序: </h4>
          <div className='dropdown-btn-wrapper'>
            <Dropdown overlay={sortMenu} placement='bottomLeft' trigger={['click']}>
              <Button>{sortKey}</Button>
            </Dropdown>
            <Button onClick={() => setSortType(type => type === 'asc' ? 'desc' : 'asc')}>
              {sortType === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </Button>
          </div>
        </div>
      </Drawer>

      <BackTop target={() => document.querySelector('.main-layout')} />
    </div>
  )
}
