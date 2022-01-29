import { DgraphEntityType, UseCasePort } from '@codelab/backend/abstract/core'
import {
  CreateResponse,
  DgraphCreateUseCase,
} from '@codelab/backend/application'
import { jsonMutation } from '@codelab/backend/infra'
import { isAdmin } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateTagRequest } from './create-tag.request'

@Injectable()
export class CreateTagService
  extends DgraphCreateUseCase<CreateTagRequest>
  implements UseCasePort<CreateTagRequest, CreateResponse>
{
  protected async executeTransaction(request: CreateTagRequest, txn: Txn) {
    if (request.input.parentTagId) {
      return await this.dgraph.create(txn, (blankNodeUid) =>
        CreateTagService.createTagMutation(request, blankNodeUid),
      )
    }

    return await this.dgraph.create(txn, (blankNodeUid) =>
      CreateTagService.createRootTagMutation(request, blankNodeUid),
    )
  }

  private static createRootTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name },
      currentUser,
    } = request

    return jsonMutation({
      uid: blankNodeUid,
      name,
      owner: isAdmin(currentUser) ? null : { uid: currentUser.id },
      parent: undefined,
      isRoot: true,
      'dgraph.type': [DgraphEntityType.Tag],
      children: [],
    })
  }

  private static createTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name, parentTagId },
      currentUser,
    } = request

    if (!parentTagId) {
      throw new Error('Must have parent')
    }

    const createJson = {
      uid: blankNodeUid,
      name,
      owner: isAdmin(currentUser) ? null : { uid: currentUser.id },
      parent: { uid: parentTagId },
      isRoot: false,
      'dgraph.type': [DgraphEntityType.Tag],
      children: [],
    }

    return {
      setJson: {
        uid: parentTagId,
        children: createJson,
      },
    }
  }
}
