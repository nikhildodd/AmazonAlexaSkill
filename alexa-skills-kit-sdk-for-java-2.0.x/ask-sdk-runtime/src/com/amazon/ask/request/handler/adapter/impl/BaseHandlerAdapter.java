/*
    Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
    except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
    the specific language governing permissions and limitations under the License.
 */

package com.amazon.ask.request.handler.adapter.impl;

import com.amazon.ask.request.handler.GenericRequestHandler;
import com.amazon.ask.request.handler.adapter.GenericHandlerAdapter;

/**
 * Handler adapter for {@link GenericRequestHandler} implementations.
 *
 * @param <Input> handler input type
 * @param <Output> handler output type
 * @param <Handler> handler type. must be a subclass of {@link GenericRequestHandler}
 */
public class BaseHandlerAdapter<Input, Output, Handler extends GenericRequestHandler<Input, Output>>
        implements GenericHandlerAdapter<Input, Output> {

    private final Class<Handler> handlerType;

    public BaseHandlerAdapter(Class<Handler> handlerType) {
        this.handlerType = handlerType;
    }

    @Override
    public boolean supports(Object handler) {
        return handlerType.isInstance(handler);
    }

    @Override
    public Output execute(Input input, Object handler) {
        return handlerType.cast(handler).handle(input);
    }

}
