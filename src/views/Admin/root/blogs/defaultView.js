import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import Pluralize from 'pluralize'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import { useDebounce } from 'src/hooks'
import {
  BLOG_DELETED,
  TITLE_UPDATE,
  TOKEN_EXPIRED,
} from 'src/constants/actions'
import { formatDate } from 'src/helpers/Utils'

const Blogs = ({ history }) => {
  const pageTitle = 'My Blogs',
    staleTime = Infinity,
    {
      appStore: { apiURL, user },
      updateAppStore,
    } = useContext(AppContext),
    [limit, setLimit] = useState(10),
    [pageNum, setPageNum] = useState(1),
    fetchPosts = async ({ queryKey: [userId] }) =>
      axios({
        method: 'get',
        url: `${apiURL}/post/user/${userId}/${pageNum}/${limit}`,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }).catch(error => {
        if (error.response) {
          error.response.status === 504 &&
            updateAppStore({
              type: TOKEN_EXPIRED,
              payload: {
                history,
                error: {
                  code: TOKEN_EXPIRED,
                  color: 'warning',
                  message: error.response.data.error,
                },
              },
            })
        }
      }),
    { isLoading, data, isError, error, isRefetching, refetch } = useQuery(
      [user?.user._id, 'user-posts'],
      fetchPosts,
      {
        // cacheTime: 5000,
        staleTime,
        refetchOnMount: 'always',
        select: data => data?.data,
      }
    ),
    deletePost = async postId =>
      axios({
        method: 'delete',
        url: `${apiURL}/post/id/${postId}`,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then(res => {
          refetch()
          updateAppStore({
            type: BLOG_DELETED,
            payload: {
              notification: {
                code: BLOG_DELETED,
                color: 'danger',
                message: res.data.message,
              },
            },
          })
        })
        .catch(error => {
          if (error.response) {
            error.response.status === 504 &&
              updateAppStore({
                type: TOKEN_EXPIRED,
                payload: {
                  history,
                  error: {
                    code: TOKEN_EXPIRED,
                    color: 'warning',
                    message: error.response.data.error,
                  },
                },
              })
          }
        }),
    { mutateAsync: doDeletePost } = useMutation(deletePost),
    columns = [
      {
        id: 'title',
        name: 'Blog Title',
        grow: 4,
        cell: row => <Link to={`/admin/edit/${row._id}`}>{row.title}</Link>,
      },
      {
        id: 'createdAt',
        name: 'Created At',
        grow: 2,
        cell: row =>
          formatDate(new Date(row.createdAt), 'MMM dd, yyyy hh:mm aa'),
      },
      {
        id: 'status',
        name: 'Status',
        cell: () => 'Published',
      },
      {
        id: 'order',
        name: 'Order',
        cell: (_, i) => i + 1,
      },
      {
        id: 'action',
        name: 'Action',
        cell: row => (
          <>
            <Link
              to={`/admin/edit/${row._id}`}
              className={'btn btn-admin text-decoration-none me-2'}
            >
              Edit
            </Link>
            <Button
              variant={'danger'}
              onClick={({ target }) => {
                if (
                  window.confirm('Are you sure you want to delete this blog?')
                ) {
                  target.disabled = true
                  doDeletePost(row._id)
                }
              }}
            >
              Delete
            </Button>
          </>
        ),
      },
    ]

  useDebounce(
    () => {
      refetch()
    },
    100,
    [limit, pageNum]
  )

  useEffect(() => {
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle: pageTitle,
      },
    })
  }, [updateAppStore])

  !false && console.log(data, limit)

  if (isLoading || isRefetching) {
    return (
      <div className={'d-flex h-100 align-items-center justify-content-center'}>
        <div
          className={'spinner-border spinner-border-sm text-admin'}
          role={'status'}
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className={'visually-hidden'}>Loading...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className={`toast align-items-center text-white bg-danger border-0 show py-3 px-4`}
        role={'alert'}
        aria-live={'assertive'}
        aria-atomic={'true'}
      >
        {error.message}
      </div>
    )
  }

  return (
    <div className={'card my-4 p-3'}>
      <h4>Blogs Listing</h4>
      <DataTable columns={columns} data={data?.posts} />
      <div className={'d-flex justify-content-between mt-3'}>
        <div className={'my-auto d-flex align-items-center'}>
          <strong className={'me-2'}>
            <small>Limit:</small>
          </strong>
          <select
            value={limit}
            onChange={({ target: { value } }) => setLimit(parseInt(value))}
            className={'form-select'}
            aria-label={'Select limit'}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className={'my-auto'}>
          <nav aria-label={'Page navigation'}>
            <ul className={'pagination'}>
              <li className={'page-item'}>
                <Button
                  className={'page-link bg-admin text-white'}
                  aria-label={'Previous'}
                  onClick={() => setPageNum(prevPageNum => prevPageNum - 1)}
                  disabled={pageNum === 1}
                >
                  <span aria-hidden={'true'}>&laquo;</span>
                </Button>
              </li>
              <li className={'page-item'}>
                <div
                  className={
                    'd-flex justify-content-center align-items-center h-100 mx-3'
                  }
                >{`Showing page ${data?.currentPage} of ${data?.totalPages}`}</div>
              </li>
              <li className="page-item">
                <Button
                  className="page-link bg-admin text-white"
                  aria-label={'Next'}
                  onClick={() => setPageNum(prevPageNum => prevPageNum + 1)}
                  disabled={data?.currentPage === data?.totalPages}
                >
                  <span aria-hidden={'true'}>&raquo;</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <div className={'my-auto'}>
          <strong>
            <small>{`Total ${Pluralize(
              'Blog',
              data?.totalPosts,
              true
            )}`}</small>
          </strong>
        </div>
      </div>
    </div>
  )
}

export default Blogs
